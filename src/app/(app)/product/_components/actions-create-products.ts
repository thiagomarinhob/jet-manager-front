"use server";

import { getCurrentRestaurant } from '@/auth/auth';

import { HTTPError } from "ky";
import { z } from "zod";

import { createProduct } from "@/http/create-product";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  category_id: z.string({
    message: "Selecione uma categoria válida", 
  }),
  price: z.coerce.number().positive({
    message: "Preço deve ser um valor positivo.",
  }),
  in_stock: z.boolean().default(true).optional(),
  description: z.string().min(5, {
    message: "Descrição deve ter pelo menos 5 caracteres.",
  }),
  image_url: z.string().optional(),
});

export async function productAction(data: any){

  const restaurant_id = await getCurrentRestaurant()

  const restaurantID = restaurant_id as string;
  
  console.log("Meu restaurante id: ", restaurant_id)

  console.log("Meu data: ", data)
  
  const result = productSchema.safeParse({
    data,
    price: Number(data.price),
  });
  console.log('Resultado da validação:', result);
  if (!result.success) {
    console.log('Erros de validação:', result.error.errors);
  }

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }
  
  const { name, description, price, in_stock, image_url, category_id } =
  result.data;
  
  
  console.log("Dados recebidos:", Object.fromEntries(data));

  try {
    await createProduct({
      restaurant_id: restaurantID, 
      data: {
        name,
        description,
        price,
        in_stock: in_stock || true,
        image_url: image_url || "",
        category_id,
      },
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      console.error("Erro ao criar produto:", err);
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    console.error("Erro ao criar produto:", err);
    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }
  
  return { success: true, message: null, errors: null };
}