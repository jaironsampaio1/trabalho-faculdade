import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const id = parseInt(getRouterParam(event, "id")!);
    
    const task = await prisma.task.findUnique({
        where: {
        id: id,
        },
    });
    
    return task;
});