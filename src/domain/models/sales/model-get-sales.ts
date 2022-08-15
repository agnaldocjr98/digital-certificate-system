import { BaseModel } from "@/domain/models";

export interface GetSalesContent {
  uid: string;
  voucher: string;
  datacadastro: string;
  documento: string;
  tipocertificado: string;
  idparceiro: number;
  clienteid: string;
  protocolo: string;
  valor: number;
  status: string;
  dataagendamento: string;
  statusagendamento: string;
  emitido: boolean;
  aprovado: boolean;
  pago: boolean;
}

export interface GetSalesModel extends BaseModel<GetSalesContent[]> {}
