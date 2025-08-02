"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signInAction(formData: any) {
  try {
    if (formData.credential) {
      await signIn("credentials", {
        ...formData,
        redirect: true,
        redirectTo: "/c/chk7964",
      });
    } else {
      await signIn("github");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Something Went Wrong" };
      }
    }
  }
}
