import { AuthWrapper } from "@/features/auth/components/Auth-wrapper";
import { auth } from "@/features/auth/config/authOptions";
import { redirect } from "next/navigation";



export default async function AuthPage() {
  const session = await auth();
  
  if (session) {
    return redirect("/");
  }

  return (
    // <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background">
    // </main>
      <div className="min-h-screen flex flex-col lg:flex-row">
            <AuthWrapper />
      </div>
   
  );
}
