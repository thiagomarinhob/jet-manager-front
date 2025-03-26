import { Product } from "@/constants/data";
import { api } from "./api-client";

interface ResponseProducts {
  items: Product[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_prev: boolean;
}

export default async function getProducts(restaurant_id: string) {
  const result = await api
    .get(`v1/restaurants/${restaurant_id}/products?`)
    .json<ResponseProducts>();

  return result;
}
