import { BaseModel } from "@/domain/models";

export interface intervals {
  id: number;
  schedule: string;
  idschedule: number;
  datetimestart: string;
  datetimeend: string;
}
export interface GetSchedulesContent {
  schedule: string;
  intervals: intervals[];
}

export interface GetSchedulesModel extends BaseModel<GetSchedulesContent[]> {}
