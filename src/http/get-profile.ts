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
    // Você pode personalizar o tratamento de erro conforme necessário
    console.error("Erro ao buscar perfil:", error);

    // Opção 1: Retornar um objeto vazio ou com valores padrão
    // return {} as GetProfile;

    // Opção 2: Retornar null para indicar que houve um erro
    return null;

    // Opção 3: Lançar um erro personalizado
    // throw new Error('Não foi possível obter o perfil. Tente novamente mais tarde.');
  }
}