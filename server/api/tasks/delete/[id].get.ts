import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id")!);

  await prisma.task.delete({
    where: {
      id: id,
    },
  });

  return { statusCode: 200, statusMessage: "Deletado com sucesso!" };
});
