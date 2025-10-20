import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
      <SignupForm />
    </div>
  );
}
