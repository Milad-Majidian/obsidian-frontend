"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInCredentials = {
  email: string;
  password: string;
};

 type AuthUser = {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
};

export function useAuth() {
  const { data: session, status, update } = useSession();
  
  const router = useRouter();

  async function signInWithEmail({ email, password }: SignInCredentials) {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      let message = res.error
      if(res.error === "CredentialsSignin") {
        message = "Invalid email or password"
      }
      throw new Error(message);
    }
     router.push("/")
    //  router.refresh();
    return res;
  }

  async function signInWithGoogle() {
    return signIn("google");
  }

  async function logOut() {
    await signOut({ callbackUrl: "/" });
  }

  return {
    user: session?.user as AuthUser | undefined,
    status, // 'loading' | 'authenticated' | 'unauthenticated'
    isAuthenticated: status === "authenticated",
    signInWithEmail,
    signInWithGoogle,
    logOut,
    refreshSession: update,
  };
}
