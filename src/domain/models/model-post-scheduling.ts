import { BaseModel } from "@/domain/models";

export interface RegisterSchedulingContent {
  uid: string;
  exists: boolean;
}

export interface RegisterSchedulingModel
  extends BaseModel<RegisterSchedulingContent[]> {}
