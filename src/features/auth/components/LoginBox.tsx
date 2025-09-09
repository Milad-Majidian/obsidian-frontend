import { AuthForm } from "./AuthForm";
import { SocialButtons } from "./SocialButtons";

export function LoginBox() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground mb-6">
          It’s great to see you again.
        </p>
        <AuthForm mode="login" />
      </div>

      <div className="my-6 text-center text-sm">Or</div>

      <SocialButtons mode="login" />
    </>
  );
}
