import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { title, content, status } = await readBody(event);

  const { id } = await getUserSession(event);

  if (!title || !content || !status || !id) {
    setResponseStatus(event, 400);
    return {
      statusCode: 400,
      statusMessage: "Campos obrigatórios não preenchidos!",
    };
  }

  await prisma.task.create({
    data: {
      title: title,
      content: content,
      status: status,
      userId: id,
    },
  });

  return { statusCode: 200, statusMessage: "Criado com sucesso!" };
});
