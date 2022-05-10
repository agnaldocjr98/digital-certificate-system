import { AuthenticationModel } from "@/domain/models";

export interface AuthenticationParams {
  email: string;
  senha: string;
}

export interface UCAuthentication {
  auth(params: AuthenticationParams): Promise<AuthenticationModel>;
}
