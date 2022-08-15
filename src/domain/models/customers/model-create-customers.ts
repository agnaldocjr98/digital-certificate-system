import { BaseModel } from "@/domain/models";

export interface CreateCustomerContent {
  uid: number;
}

export interface CreateCustomerModel extends BaseModel<CreateCustomerContent> {}
