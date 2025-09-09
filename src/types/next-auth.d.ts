import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
