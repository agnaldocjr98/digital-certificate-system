import { GetCustomersModel } from "@/domain/models";

export interface GetCustomersParams {
  search?: string;
  datetimestart?: string;
  datetimeend?: string;
  idpartner: number;
}

export interface UCGetCustomers {
  get(params: GetCustomersParams): Promise<GetCustomersModel>;
}
