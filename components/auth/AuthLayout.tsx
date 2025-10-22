"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  linkText: string;
  linkHref: string;
  linkLabel: string;
}

export function AuthLayout({
  title,
  description,
  children,
  linkText,
  linkHref,
  linkLabel,
}: AuthLayoutProps) {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleAuthButton mode="signin" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with email
              </span>
            </div>
          </div>

          {children}

          <div className="text-center text-sm">
            {linkText}{" "}
            <Link href={linkHref} className="text-primary hover:underline">
              {linkLabel}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
