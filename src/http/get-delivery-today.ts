import { api } from "./api-client";

interface OrdersType {
  count: number;
  date: string;
  orders: unknown[];
}

export default async function getDeliveryToday(restaurant_id: string) {
  const result = await api
    .get(`v1/restaurants/${restaurant_id}/delivery/today`)
    .json<OrdersType>();

  return result;
}
