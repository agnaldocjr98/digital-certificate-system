import { BaseModel } from "@/domain/models";

export interface AuthenticationContent {
  nome: string;
  email: string;
  tipo: string;
  valid: boolean;
  id: number;
}

export interface AuthenticationModel extends BaseModel<AuthenticationContent> {}
