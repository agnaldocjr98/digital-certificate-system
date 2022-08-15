import { GetDashboardsModel } from "../models";

export interface GetDashboardsParams {
  date: string;
}

export interface UCGetDashboards {
  get(params: GetDashboardsParams): Promise<GetDashboardsModel>;
}
