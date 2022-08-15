import { CreateSaleModel, CreateSaleContent } from "@/domain/models";

export interface CreateSaleParams {
  documento: string;
  tipocertificado: string;
  idparceiro: number;
}

export interface UCCreateSale {
  create(params: CreateSaleParams): Promise<CreateSaleModel>;
}
