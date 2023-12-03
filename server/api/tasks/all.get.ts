import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const { id } = await getUserSession(event);

  return await prisma.task.findMany({
    where: {
      userId: id,
    },
  });
});
