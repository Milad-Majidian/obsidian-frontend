'use client'
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const {logOut:signOut} = useAuth()
   const {data:session, status} = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ThemeToggle />
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="text-muted-foreground mt-4">
        Toggle between light and dark modes using the button below.
      </p>
      <div className="flex flex-col gap-3">
        <h2 className="text-primary dark:text-primary">Hello, World!</h2>
        <div className="bg-white text-black dark:bg-zinc-900 dark:text-white">
          Welcome!
        </div>
      </div>
      <div className="mt-6">
        {status === "loading" && <p>Loading...</p>}
        <Button onClick={() => signOut()}>
            Sign Out
        </Button> 
      </div>
    </main>
  );
}
