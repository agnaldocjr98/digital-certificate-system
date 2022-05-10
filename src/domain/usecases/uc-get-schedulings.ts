import { GetSchedulingsModel } from "@/domain/models";

export interface GetSchedulingsParams {
  search?: string;
  datetimestart?: string;
  datetimeend?: string;
  iduser: number;
  reschedule: boolean;
  waitingfinish: boolean;
}

export interface UCGetSchedulings {
  getSchedulings(params: GetSchedulingsParams): Promise<GetSchedulingsModel>;
}
