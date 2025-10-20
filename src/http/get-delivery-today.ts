import { api } from "./api-client";

interface OrdersType {
  count: number;
  date: string;
  orders: unknown[];
}

export default async function getDeliveryToday() {
  try {
    const result = await api
      .get(`v1/restaurants/delivery/today`)
      .json<OrdersType>();
  
    return result;
  } catch {
    return null; // Return a default structure in case of error
  }
}
