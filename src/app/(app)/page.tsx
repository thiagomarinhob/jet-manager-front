import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function home() {
  if (!(await isAuthenticated())) {
   return redirect('/auth/sign-in')
  }
}