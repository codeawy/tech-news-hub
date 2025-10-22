"use server";

import { syncUserToDatabase } from "@/lib/supabase/auth";
import { signUpSchema, signInSchema } from "@/validation/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { UserRole } from "@prisma/client";

/**
 * Sign up with email and password
 */
export async function signUp(formData: FormData) {
  try {
    // Parse and validate form data
    const rawData = {
      username: (formData.get("username") as string) || "",
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
      confirmPassword: (formData.get("confirmPassword") as string) || "",
    };

    const validatedData = signUpSchema.parse(rawData);

    const supabase = await createClient(cookies());

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          first_name: validatedData.username,
        },
      },
    });

    if (error) {
      console.error("Sign up error:", error);
      throw new Error(error.message);
    }

    if (data.user) {
      // Sync user to Prisma database
      await syncUserToDatabase({
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.username,
        id: data.user.id,
        address: null,
        avatar_url: null,
        role: UserRole.READER,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Redirect to email verification page
    // redirect("/auth/verify-email");
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Sign up failed:", error);

    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred during sign up");
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(formData: FormData) {
  try {
    // Parse and validate form data
    const rawData = {
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
      rememberMe: formData.get("rememberMe") === "true",
    };

    const validatedData = signInSchema.parse(rawData);

    const supabase = await createClient(cookies());

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      console.error("Sign in error:", error);
      throw new Error(error.message);
    }

    if (data.user) {
      // User successfully signed in
      return { success: true, message: "Successfully signed in" };
    }

    return { success: false, message: "Sign in failed" };
  } catch (error) {
    console.error("Sign in failed:", error);

    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred during sign in");
  }
}
