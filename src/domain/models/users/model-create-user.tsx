import { BaseModel } from "@/domain/models";

export interface CreateUserContent {
  id: number;
}

export interface CreateUserModel extends BaseModel<CreateUserContent> {}
