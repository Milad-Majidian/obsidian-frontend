"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "../schemas/authSchema";
import { useLogin } from "../hooks/useLogin";
import { signIn } from "next-auth/react";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useAuth } from "../hooks/useAuth";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
    const { user, isAuthenticated, signInWithGoogle, logOut,signInWithEmail } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
   const {showError,showSuccess } = useToastMessage() 
  
   const {login, isLoading} = useLogin()

  const form = useForm<RegisterSchema | LoginSchema>({
    resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
    defaultValues: mode === "register"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  const onSubmit = async (values: any) => {
    const { email, password } = values;
     if (mode === 'login') {
       try {
         await signInWithEmail({ email, password });
         showSuccess("Logged in successfully!");
       } catch (error:any) {
         showError(error.message);
       }

    } else {
      // Handle register here
    }


  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "loading..." : mode === "register" ? "Create an Account" : "Login"}
        </Button>
      </form>
    </Form>
  );
}
