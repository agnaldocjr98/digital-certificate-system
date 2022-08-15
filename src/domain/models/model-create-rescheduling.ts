import { BaseModel } from "@/domain/models";

export interface CreateReschedulingContent {
  uid: string;
  exists: boolean;
}

export interface CreateReschedulingModel
  extends BaseModel<CreateReschedulingContent[]> {}
