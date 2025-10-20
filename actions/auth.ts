"use server";

import { syncUserToDatabase } from "@/lib/supabase/auth";
import { signupFormSchema } from "@/schema/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";

export async function signupToSupabaseAction(formData: FormData) {
  try {
    // Parse and validate form data
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    const validatedData = signupFormSchema.parse(rawData);
    const supabase = await createClient(cookies());

    const { error, data } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
        },
      },
    });

    // Error handling
    if (error) {
      console.log("Error while sign up", error);
      throw new Error(error.message);
    }

    if (data.user) {
      await syncUserToDatabase(data.user);
    }
  } catch (error) {
    console.log("Error while failed", error);

    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred during sign up");
  }
}
