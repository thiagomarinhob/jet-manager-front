import { api } from "./api-client";

interface GetProduct {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  type: string;
  in_stock: boolean;
  image_url: string;
}

export default async function getProduct(restaurant_id: string, product_id: string) {
  const result = await api
    .get(`v1/restaurants/${restaurant_id}/products/${product_id}`)
    .json<GetProduct>();

  return result;
}
