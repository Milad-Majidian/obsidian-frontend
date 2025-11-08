import type { NextAuthConfig } from  "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok || !data?.accessToken) {
      throw new Error("Failed to refresh token");
    }

    return {
      ...token,
      accessToken: data.accessToken,
      // optionally rotate refresh token if backend returns a new one
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1h
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}


const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params : {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "you@example.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null
            }
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
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
            if (!res.ok || !data.success) {
              // throw new Error(data.message || "Invalid email or password");
              return null
            }

             return {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  accessToken: data.accessToken,   // from backend
                  refreshToken: data.refreshToken, // from backend
               };
        }
    }),
  ],
   session: {
    strategy: "jwt",
    // maxAge: 60 * 60 * 24 * 7, // 7 days
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          id : user.id,
          email : user.email,
          accessToken : user.accessToken,
          refreshToken : user.refreshToken,
          accessTokenExpires : Date.now() + 60 * 60 * 1000 // 1h
        };
      }
      if(Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string | undefined,
          emailVerified: null,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
      // if (!session || !token) {
      //     console.error("Missing session or token in session callback");
      //  return session;
      //   }
      // try {
      //    session.user.id = String(token.id);
      //    session.user.email = String(token.email);
      //    session.accessToken = String(token.accessToken);
      //    session.refreshToken = String(token.refreshToken);
      // } catch (error) {
      //   console.error("Error setting session user:", error);
      // }
      // return session;
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
