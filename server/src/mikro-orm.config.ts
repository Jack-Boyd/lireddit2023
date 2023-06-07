import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

console.log("dirname: ", __dirname);
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'ethic',
  type: 'postgresql',
  debug: !__prod__,
  allowGlobalContext: true,
  user: "commander",
  password: "commander"
} as Parameters<typeof MikroORM.init>[0]