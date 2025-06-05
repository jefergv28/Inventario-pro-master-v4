// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      accessToken?: string; // Mantén el accessToken opcional
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken?: string; // El accessToken sigue siendo opcional
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken: string; // El accessToken debe ser un string
  }
}
