"use server";
import type { apiResponse } from "@/types/api-response";

export async function SearchAction(data: string): Promise<apiResponse> {
  try {
    // const res = await fetch(
    //   `${env.NEXT_PUBLIC_SITE_URL}/api/stylish_name/search?q=${data}`
    // );
    // const response = await res.json();
    return { data: { names: [] }, message: null, success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: "Something Went Wrong",
    };
  }
}
