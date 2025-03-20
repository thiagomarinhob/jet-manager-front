import { Product } from "@/constants/data";
import { api } from "./api-client";
import { SearchParams } from "nuqs";

interface ResponseProducts {
  items: Product[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_prev: boolean;
}

interface PropsProducts {
  restaurant_id: string;
  searchParams: SearchParams;
}

export default async function getProducts(data: PropsProducts) {

  // Criando o objeto URLSearchParams para construir a query string
  const queryParams = new URLSearchParams();

  // Verifica se searchParams existe e adiciona cada parâmetro à query string
  if (data.searchParams) {
    // Converter searchParams para objeto se for necessário
    const params =
      typeof data.searchParams === "string"
        ? JSON.parse(data.searchParams)
        : data.searchParams;

    // Adiciona cada parâmetro à URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });
  }

  // Constrói a URL com query params (se houver)
  const queryString = queryParams.toString();
  const url = `v1/restaurants/${data.restaurant_id}/products${
    queryString ? `?${queryString}` : ""
  }`;
  console.log("🚀 ~ getProducts ~ url:", url)

  // Faz a chamada à API
  const result = await api.get(url).json<ResponseProducts>();

  return result;
}
