import { BaseModel } from "@/domain/models";

export interface UpdateSaleContent {
  uid: string;
  voucher: string;
}

export interface UpdateSaleModel extends BaseModel<UpdateSaleContent> {}
