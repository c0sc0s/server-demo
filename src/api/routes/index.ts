import { FastifyPluginAsync } from "fastify";
import userRoutes from "./user";
// import postRoutes from "./post";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const routes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // 注册用户路由
  app.register(userRoutes, { prefix: "/user" });

  // 注册文章路由
  // fastify.register(postRoutes, { prefix: "/post" });
};

export default routes;
