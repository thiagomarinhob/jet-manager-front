import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  token: string;
  user: {
    id: string
  };
  restaurant: {
    id: string
  }
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
  .post("v1/auth/login", {
    json: {
      email,
      password
    }
  })
  .json<SignInWithPasswordResponse>();

  return result;
}
