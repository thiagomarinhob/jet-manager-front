import { Transaction } from "@/constants/data";
import { api } from "./api-client";


export default async function GetTransactions(userId: string) {
  const result = await api
    .get(`transaction/users/${userId}`)
    .json<Transaction[]>();

  return result
}