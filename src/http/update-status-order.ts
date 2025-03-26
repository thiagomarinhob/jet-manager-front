import { api } from "./api-client";

interface IUpdateStatusOrder {
  restaurant_id: string;
  order_id: string;
  status: string;
}

export async function updateStatusOrder({
  restaurant_id,
  order_id,
  status,
}: IUpdateStatusOrder) {
  const result = await api.patch(
    `v1/restaurants/${restaurant_id}/orders/${order_id}/status`,
    {
      json: {
        status: status,
      },
    }
  ).json();

  return result
}