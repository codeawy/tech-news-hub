import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SigninPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
      linkText="Don't have an account?"
      linkHref="/signup"
      linkLabel="Sign up"
    >
      <SignInForm />
    </AuthLayout>
  );
}
