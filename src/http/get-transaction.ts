import { api } from "./api-client";

interface GetTransactions {
  id: string;
  category: string;
  type: string;
  amount: number;
  description: string;
  createdAt: Date;
}

export default async function getTransaction(id: string) {
  const result = await api.get(`transaction/${id}`).json<GetTransactions>();

  return result;
}
