import { BaseModel } from "@/domain/models";

export interface GetUsersContent {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  ativo: string;
}

export interface GetUsersModel extends BaseModel<GetUsersContent[]> {}
