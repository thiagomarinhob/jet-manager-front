import { api } from "./api-client";

interface CreateProductRequest {
  restaurant_id: string;
  data: {
    name: string;
    price: number;
    description: string;
    image_url: string;
    in_stock: boolean;
    category_id: string; 
  };
}

export async function createProduct({
  restaurant_id,
  data,
}: CreateProductRequest) {

  try {
    const result = await api.post(`v1/restaurants/products`, {
      json: {
        restaurant_id,
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        type: "drink", 
        in_stock: data.in_stock,
        image_url: data.image_url,
      },
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}