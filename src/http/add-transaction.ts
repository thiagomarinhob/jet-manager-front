import { api } from "./api-client"

interface AddNewTransactionRequest {
  description: string;
  amount: number;
  type: string;
  category: string;
}

export async function addNewTransaction({
  description,
  amount,
  type,
  category,
}: AddNewTransactionRequest) {
  const result = await api.post("transaction", {
    json: {
      description,
      amount,
      type,
      category
    },
  }).json();
  
  return result
}