"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "../schemas/authSchema";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/elements/Input";
import { Button } from "@/components/ui/elements/Button";
import { useRegister } from "../hooks/useRegister";
import { useToastMessage } from "@/common/hooks/useToastMessage";

type Mode = "login" | "register";


export function AuthForm({ mode }: { mode: Mode }) {
  const { signInWithEmail } = useAuth();
  const { register: registerUser, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const {showError,showSuccess } = useToastMessage() 

  const form = useForm<RegisterSchema | LoginSchema>({
    resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
    defaultValues: mode === "register"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  const onSubmit = async (values: RegisterSchema | LoginSchema) => {
    if (mode === "login") {
      const payload = values as LoginSchema;
      try {
        await signInWithEmail(payload);
        showSuccess("Logged in successfully!");
      } catch (error: unknown) {
        const message = (error as { message?: string })?.message ?? "Login failed";
        showError(message);
      }
    } else if (mode === "register") {
      const payload = values as RegisterSchema;
      // Map `name` -> `fullName` to match backend `RegisterRequest`
      registerUser({ fullName: payload.name, email: payload.email, password: payload.password });
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

        <Button className="w-full cursor-pointer mt-6" type="submit" disabled={isLoading}>
          {isLoading ? "loading..." : mode === "register" ? "Create an Account" : "Login"}
        </Button>
      </form>
    </Form>
  );
}
