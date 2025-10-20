import { Category } from "@/constants/data";
import { api } from "./api-client";

interface ResponseCategory {
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  items: Category[];
  page_size: number;
  total_items: number;
  total_pages: number;
}

export default async function getCategories() {
  const result = await api
    .get(`v1/restaurants/categories`)
    .json<ResponseCategory>();

  return result;
}
