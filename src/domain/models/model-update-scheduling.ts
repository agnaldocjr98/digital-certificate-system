import { BaseModel } from "@/domain/models";

export interface UpdateSchedulingContent {
  uid: string;
  exists: boolean;
}

export interface UpdateSchedulingModel
  extends BaseModel<UpdateSchedulingContent> {}
