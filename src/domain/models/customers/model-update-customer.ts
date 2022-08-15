import { BaseModel } from "@/domain/models";

export interface UpdateCustomerContent {
  uid: string;
}

export interface UpdateCustomerModel extends BaseModel<UpdateCustomerContent> {}
