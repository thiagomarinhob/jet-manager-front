import { api } from "./api-client";

export default async function getDeliveryToday(restaurant_id: string) {
  const result = await api
    .get(`v1/restaurants/${restaurant_id}/delivery/today`)
    .json();

  return result;
}
