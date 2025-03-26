"use server";

import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { z } from "zod";

import { signInWithPassword } from "@/http/sign-in-with-password";

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please, provide a valid e-mail address." }),
  password: z.string().min(1, { message: "Please, provide your password." }),
});

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { email, password } = result.data;

  try {
    const { token, user, restaurant } = await signInWithPassword({
      email,
      password,
    });

    const cookieStore = cookies(); // Pegamos uma única instância de cookies()

    cookieStore.set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    cookieStore.set("user-id", user.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    cookieStore.set("restaurant-id", restaurant.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return { success: true, message: "Login realizado com sucesso!" };
  } catch (err) {
    console.error("Erro ao fazer login:", err);

    if (err instanceof HTTPError && err.response) {
      try {
        const contentType = err.response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
          const responseData = await err.response.json();
          return { success: false, message: responseData.message || "Erro desconhecido.", errors: null };
        } else {
          const textResponse = await err.response.text(); // Caso a resposta não seja JSON
          return { success: false, message: textResponse || "Erro inesperado no servidor.", errors: null };
        }
      } catch (parseError) {
        console.error("Erro ao processar a resposta do erro:", parseError);
        return { success: false, message: "Erro ao processar a resposta do servidor.", errors: null };
      }
    }

    return { success: false, message: "Erro inesperado.", errors: null };
  }
}
