import Fastify from "fastify";
import routes from "./routes";
import dbPlugin from "./plugins/db";
import authPlugin from "./plugins/auth";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { loggerConfig, publicPaths } from "./config";
import "dotenv/config";

export const BASE_URL = process.env.BASE_URL || "";

const server = Fastify({
  logger: loggerConfig,
});

// 设置 Zod 作为验证和序列化器
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// 注册插件
server.register(dbPlugin);
server.register(authPlugin, {
  publicPaths: publicPaths,
});

// 注册路由
server.register(routes, { prefix: BASE_URL });

export { server };
