import { Product } from "@/constants/data";
import { api } from "./api-client";

export default async function getProducts(restaurant_id: string) {
  const result = await api
  .get(`v1/restaurants/${restaurant_id}/products`)
  .json<Product[]>();

  return result;
}
