import { GetSchedulesModel } from "../models";

export interface GetSchedulesParams {
  datetimestart: string;
  datetimeend: string;
}

export interface UCGetSchedules {
  getSchedules(params: GetSchedulesParams): Promise<GetSchedulesModel>;
}
