import getDeliveryToday from "@/http/get-delivery-today";
import DeliveryOrderManagement from "./components/delivery-manager";
import { getCurrentRestaurant } from "@/auth/auth";

export default async function Page() {
  const restaurant = await getCurrentRestaurant()
  const data = await getDeliveryToday(restaurant as string)
  
  return <DeliveryOrderManagement {...data} />
}