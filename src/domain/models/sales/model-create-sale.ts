import { BaseModel } from "@/domain/models";

export interface CreateSaleContent {
  uid: string;
  voucher: string;
}

export interface CreateSaleModel extends BaseModel<CreateSaleContent> {}
