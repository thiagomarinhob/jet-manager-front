import getProfile from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function hasTokenInCookies() {
  return !!(await cookies()).get("token")?.value;
}

export async function getTokenFromCookies() {
  return (await cookies()).get("token")?.value;
}

export async function getAuthenticatedProfile() {
  try {
    const token = await getTokenFromCookies();
    if (!token) {
      return { authenticated: false, profile: null };
    }

    const response = await getProfile();

    if (!response) {
      return { authenticated: false, profile: null };
    }

    const profile = await response;
    return { authenticated: true, profile };
  } catch (error) {
    console.error("Erro ao obter perfil:", error);
    return { authenticated: false, profile: null };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return cookieStore.get("user-id")?.value ?? null;
}

export async function getCurrentRestaurant() {
  const cookieStore = await cookies();
  return cookieStore.get("restaurant-id")?.value ?? null;
}

export async function auth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  redirect("/api/auth/sign-out");
}
