'use client'
import Image from "next/image";
import { useAuthMode } from "@/features/auth/hooks/useAuthMode";
import { LoginBox } from "./LoginBox";
import { RegisterBox } from "./RegisterBox";
import { Button } from "@/components/ui/elements/Button";

export const AuthWrapper = () => {
  const { mode, toggleMode } = useAuthMode();

    return (
      <>
      <div className="lg:w-1/2 relative hidden lg:block">
        <Image
          src="/auth/background.jpg" // Replace with your image path
          alt="Auth background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw" // Adjust sizes for responsive design
          quality={100} // Optional: Adjust image quality
        />
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <Image
          src="/auth/person.png" // Replace with your image path
          alt="Auth background"
          width={400} // Adjust width to desired natural size
          height={600} // Adjust height to desired natural size
          className="object-contain"
          priority
        />
        </div> */}
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
           <div className="w-full max-w-md space-y-4">
          {mode === "login" ? <LoginBox /> : <RegisterBox />}

      <div className="text-sm text-center mt-4">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <Button
              className="text-primary underline cursor-pointer"
              onClick={() => toggleMode()}
            >
              Create Account
            </Button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Button
              className="text-primary underline cursor-pointer"
              onClick={() => toggleMode()}
            >
              Log In
            </Button>
          </>
        )}
         </div>
        </div>
      </div>
    </>
    )
}