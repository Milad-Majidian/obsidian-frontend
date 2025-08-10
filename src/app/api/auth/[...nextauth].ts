import { authOptions } from "@/features/auth/config/authOptions";
import NextAuth from "next-auth";

export default NextAuth(authOptions)