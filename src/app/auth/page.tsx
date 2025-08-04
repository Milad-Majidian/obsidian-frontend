import { AuthWrapper } from "@/features/auth/components/auth-wrapper";


export default function AuthPage() {
  return (
    // <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background">
    // </main>
      <div className="min-h-screen flex flex-col lg:flex-row">
            <AuthWrapper />
      </div>
   
  );
}
