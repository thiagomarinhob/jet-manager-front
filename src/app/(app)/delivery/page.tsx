import getDeliveryToday from "@/http/get-delivery-today";
import DeliveryOrderManagement from "./components/delivery-manager";

export default async function Page() {
  const data = await getDeliveryToday()
  
  return <DeliveryOrderManagement {...data} />
}