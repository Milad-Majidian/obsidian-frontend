
import { Button } from "@/components/ui/elements/Button";
import {signIn} from "next-auth/react";

export function SocialButtons({ mode }: { mode: "login" | "register" }) {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/" })} >
        {/* <FcGoogle size={20} /> */}
        {mode === "register" ? "Sign Up with Google" : "Login with Google"}
      </Button>

      {/* <Button className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white flex items-center gap-2">
        <FaFacebook size={20} />
        {mode === "register" ? "Sign Up with Facebook" : "Login with Facebook"}
      </Button> */}
    </div>
  );
}
