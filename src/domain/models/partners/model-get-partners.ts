import { BaseModel } from "@/domain/models";

export interface GetPartnersContent {
  id: number;
  nomerazaosocial: string;
  cpfcnpj: string;
  tipo: string;
  voucher: boolean;
  boleto: boolean;
  pix: boolean;
  cartao: boolean;
  ativo: string;
  valorecpf: number;
  valorecnpj: number;
}

export interface GetPartnersModel extends BaseModel<GetPartnersContent[]> {}
