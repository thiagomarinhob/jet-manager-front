import { Category } from "@/constants/data";
import { api } from "./api-client";

export default async function getCategories(userId: string) {
  const result = await api
    .get(`categories/users/${userId}`)
    .json<Category[]>();

  return result;
}
