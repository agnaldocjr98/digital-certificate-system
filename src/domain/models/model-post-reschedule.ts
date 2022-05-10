import { BaseModel } from "@/domain/models";

export interface RegisterReschedulingContent {
  uid: string;
  exists: boolean;
}

export interface RegisterReschedulingModel
  extends BaseModel<RegisterReschedulingContent[]> {}
