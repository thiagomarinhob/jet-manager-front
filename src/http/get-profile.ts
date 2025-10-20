import { HTTPError } from "ky";
import { api } from "./api-client";

interface GetProfile {
  email: string;
  id: string;
  name: string;
  restaurant: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    subscription_plan: string;
    status: string;
    trial_ends_at: string;
  };
  restaurant_id: string;
  type: string;
}

export default async function getProfile() {
  try {
    const result = await api.get(`v1/profile`).json<GetProfile>();
    return result;
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 401) { 
      console.log("Unauthorized access - please log in again.");
      // Handle unauthorized access, e.g., redirect to login page
    }
    return null;
  }
}