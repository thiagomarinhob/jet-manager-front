"use server"

import { addNewTransaction } from "@/http/add-transaction";
import { HTTPError } from "ky";
import { z } from "zod";

const transactionSchema = z.object({
  description: z.string(),
  type: z.string(),
  amount: z.number(),
  category: z.string()
})


export async function ActionAddNewTransaction(data: FormData) {
  const result = transactionSchema.safeParse(Object.fromEntries(data));
  
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { description, amount, type, category } = result.data

  try {
    const result = await addNewTransaction({
      description,
      amount,
      type,
      category,
    });
    console.log("🚀 ~ AddNewTransaction ~ result:", result)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return { success: false, message, errors: null };
    }

    console.error(err);

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}