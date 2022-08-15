import { BaseModel } from "@/domain/models";

interface GetDashboardsAgenda {
  agtreg: string;
  day0: number;
  day1: number;
  day2: number;
  day3: number;
  day4: number;
  day5: number;
  totalvideo: number;
  videoyes: number;
  videonot: number;
  canceled: number;
}

interface GetDashboardsReagendamento {
  agtreg: string;
  day0: number;
  day1: number;
  day2: number;
  day3: number;
  day4: number;
  day5: number;
  toreschedule: number;
  canceled: number;
  rescheduled: number;
  locally: number;
  notrescheduled: number;
}

interface GetDashboardsGeral {
  agtreg: string;
  "day-5": number;
  "day-4": number;
  "day-3": number;
  "day-2": number;
  "day-1": number;
  aftertoday: number;
  day0: number;
  day1: number;
  day2: number;
  day3: number;
}

export interface GetDashboardsContent {
  schedule: {
    quantitycustomers: number;
    fromto: Array<string>;
    data: GetDashboardsAgenda[];
  };
  reschedule: {
    fromto: Array<string>;
    data: GetDashboardsReagendamento[];
  };
  geral: {
    fromto: Array<string>;
    data: GetDashboardsGeral[];
  };
}

export interface GetDashboardsModel extends BaseModel<GetDashboardsContent> {}
