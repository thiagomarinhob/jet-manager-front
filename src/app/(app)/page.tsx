import { getAuthenticatedProfile } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function home() {
  if (!((await getAuthenticatedProfile()).authenticated)) {
   return redirect('/auth/sign-in')
  }
}