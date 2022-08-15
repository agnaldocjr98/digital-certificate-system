import { BaseModel } from "@/domain/models";

export interface CreateSchedulingContent {
  uid: string;
  exists: boolean;
}

export interface CreateSchedulingModel
  extends BaseModel<CreateSchedulingContent[]> {}
