import { BaseModel } from "@/domain/models";

export interface GetClientsContent {
  uid: string;
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
  idparceiro: number;
}

export interface GetClientsModel extends BaseModel<GetClientsContent[]> {}
