import { FastifyRequest, FastifyReply } from "fastify";
import { SignupBody, GetUserParams, GetUserDraftsParams } from "./schema";

export async function getAllUsers(request: FastifyRequest) {
  const { prisma } = request.server;

  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(
  request: FastifyRequest<{ Params: GetUserParams }>,
  reply: FastifyReply
) {
  const { prisma } = request.server;
  const { id } = request.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return reply.code(404).send({ error: "User not found" });
  }

  return user;
}

export async function getUserDrafts(
  request: FastifyRequest<{ Params: GetUserDraftsParams }>
) {
  const { prisma } = request.server;
  const { id } = request.params;

  const drafts = await prisma.post.findMany({
    where: {
      authorId: Number(id),
      published: false,
    },
  });

  return drafts;
}

export async function signup(request: FastifyRequest<{ Body: SignupBody }>) {
  const { prisma } = request.server;
  const { email, name } = request.body;

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return user;
}
