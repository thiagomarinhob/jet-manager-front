import { api } from "./api-client";

interface GetTransactions {
  id: string;
  category: string;
  type: string;
  amount: number;
  description: string;
  createdAt: Date;
}

export default async function getProfile(id: string) {
  const result = await api.get(`/v1/profile /${id}`).json<GetTransactions>();

  return result;
}
