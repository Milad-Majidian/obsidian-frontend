import type { NextAuthConfig } from  "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "you@example.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    })
            });

            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message || "Invalid email or password");
            }

            if (data.success && data.user && data.user.id && data.user.email) {
              return data.user; // Return the user object only
            }

            return null
        }
    }),
  ],
   session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback user:", user);
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session || !token) {
          console.error("Missing session or token in session callback");
       return session;
        }
      try {
        session.user = {
          id: (token.id ?? "") as string ,
          email: (token.email ?? "") as string ,
          emailVerified: null, // or set to a valid Date if available
        };
      } catch (error) {
        console.error("Error setting session user:", error);
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);
