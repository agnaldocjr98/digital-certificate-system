import { BaseModel } from "@/domain/models";

export interface UpdateUserContent {
  id: number;
}

export interface UpdateUserModel extends BaseModel<UpdateUserContent> {}
