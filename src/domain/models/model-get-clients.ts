import { BaseModel } from "@/domain/models";

export interface GetClientsContent {
  horacadastro: string;
  numero: string;
  id: string;
  nome: string;
  email: string;
  telefone: string;
  clienteblip: string;
  cpfcnpj: string;
  parceiro: string;
  tipocertificado: string;
}

export interface GetClientsModel extends BaseModel<GetClientsContent[]> {}
