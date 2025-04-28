import { FastifyPluginAsync } from "fastify";
import { getAllUsers, getUserById, getUserDrafts, signup } from "./handlers";
import { getUserParams, getUserDraftsParams, signupBody } from "./schema";

const userRoutes: FastifyPluginAsync = async (fastify) => {
  // signup
  fastify.post("/signup", { schema: { body: signupBody } }, signup);

  // GET /api/user/all
  fastify.get("/all", getAllUsers);

  // GET /api/user/:id
  fastify.get("/:id", { schema: { params: getUserParams } }, getUserById);

  // GET /api/user/:id/drafts
  fastify.get(
    "/:id/drafts",
    { schema: { params: getUserDraftsParams } },
    getUserDrafts
  );
};

export default userRoutes;
