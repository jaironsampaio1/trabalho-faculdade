import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.email || !body?.password || !body?.name) {
    return {
      statusCode: 400,
      statusMessage: "Campos obrigatórios não preenchidos!",
    };
  }

  if (!(await emailIsValid(body.email))) {
    return { statusCode: 400, statusMessage: "Email já cadastrado!" };
  }

  const { name, email, password } = body;

  var user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return { statusCode: 200, statusMessage: "Sucesso!" };
});

async function emailIsValid(email: string) {
  return (
    (await prisma.users.count({
      where: {
        email: email,
      },
    })) == 0
  );
}
