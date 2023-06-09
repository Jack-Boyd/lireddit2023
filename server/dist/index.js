"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const core_1 = require("@mikro-orm/core");
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    let redisClient = (0, redis_1.createClient)();
    redisClient.connect().catch(console.error);
    let redisStore = new connect_redis_1.default({
        client: redisClient,
        disableTouch: true,
        prefix: "myapp:",
    });
    app.use((0, express_session_1.default)({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        name: constants_1.COOKIE_NAME,
        store: redisStore,
        saveUninitialized: true,
        resave: false,
        secret: "theonepieceisrealyohohohohohoho",
    }));
    const apolloServer = new server_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false
        })
    });
    yield apolloServer.start();
    app.use('/graphql', (0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () { return ({ em: orm.em, req, res, token: req.headers.token }); }),
    }));
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
});
main().catch(err => console.error(err));
//# sourceMappingURL=index.js.map