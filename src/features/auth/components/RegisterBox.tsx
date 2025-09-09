import { AuthForm } from "./AuthForm";
import { SocialButtons } from "./SocialButtons";

export function RegisterBox() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Let’s create your account.
        </p>
        <AuthForm mode="register" />
      </div>

      <div className="my-6 text-center text-sm">Or</div>

      <SocialButtons mode="register" />
    </>
  );
}
