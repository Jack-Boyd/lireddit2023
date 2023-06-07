import "reflect-metadata"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { MikroORM } from "@mikro-orm/core";
import { json } from 'body-parser';
import express from "express";
import cors from 'cors';
import { buildSchema } from "type-graphql";

import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import {createClient} from "redis";
import { MyContext } from "./types";

//sudo service redis-server start

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  let redisClient = createClient();
  redisClient.connect().catch(console.error);
  
  let redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
    prefix: "myapp:",
  });
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      name: 'qid',
      resave: false,
      store: redisStore,
      saveUninitialized: false,
      secret: "theonepieceisrealyohohohohohoho",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    })
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors({origin: 'http://localhost:3000', credentials: true}),
    json(), 
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({ em: orm.em, req, res, token: req.headers.token }),
    }
  ));

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch(err => console.error(err));
