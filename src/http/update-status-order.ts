import { api } from "./api-client";

interface IUpdateStatusOrder {
  order_id: string;
  status: string;
}

export async function updateStatusOrder({
  order_id,
  status,
}: IUpdateStatusOrder) {
  const result = await api.patch(
    `v1/restaurants/orders/${order_id}/status`,
    {
      json: {
        status: status,
      },
    }
  ).json();

  return result
}