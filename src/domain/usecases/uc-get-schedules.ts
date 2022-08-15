import { GetSchedulesModel } from "../models";

export interface GetSchedulesParams {
  datetimestart: string;
  datetimeend: string;
  locally: boolean;
}

export interface UCGetSchedules {
  get(params: GetSchedulesParams): Promise<GetSchedulesModel>;
}
