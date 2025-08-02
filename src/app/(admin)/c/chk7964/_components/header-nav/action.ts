"use server";

import { signOut } from "@/auth";

export async function signOutAction() {
  await signOut();

  // redirect("/c/sign-in",);
  // return NextResponse.redirect("http://localhost:3000/c/sign-in", {});
}
