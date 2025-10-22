import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Join and create your perfect resume"
      linkText="Already have an account?"
      linkHref="/signin"
      linkLabel="Sign in"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
