import { BaseModel } from "@/domain/models";

export interface CancelSchedulingContent {
  uid: string;
  exists: boolean;
}

export interface CancelSchedulingModel
  extends BaseModel<CancelSchedulingContent> {}
