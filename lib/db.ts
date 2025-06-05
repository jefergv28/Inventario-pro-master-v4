// app/lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// 👇 Agrega esta función para evitar el error en route.ts
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
