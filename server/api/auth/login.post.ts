import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.users.findFirst({
    where: {
      email: body?.email,
      password: body?.password,
    },
  });

  if (!user) {
    setResponseStatus(event, 401);
    return { statusCode: 401, statusMessage: "Invalido" };
  }

  await setUserSession(event, {
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return { statusCode: 200, statusMessage: "Sucesso!" };
});
