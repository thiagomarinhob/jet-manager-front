import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  token: string;
  user: {
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
  console.log("🚀 ~ result:", result)

  return result;
}
