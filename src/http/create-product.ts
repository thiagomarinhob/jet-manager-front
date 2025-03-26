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
  console.log("Enviando dados para a API:", { restaurant_id, data });

  try {
    // Remova a propriedade restaurant_id aninhada no objeto json
    // e envie os dados diretamente no formato que o servidor espera
    const result = await api.post(`v1/restaurants/${restaurant_id}/products`, {
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

    console.log("Resposta completa da API:", await result.json());
    return result;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}