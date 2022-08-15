import { GetSalesModel } from "@/domain/models";

export interface GetSalesParams {
  search: string;
  datetimestart: string;
  datetimeend: string;
  idpartner: number;
}

export interface UCGetSales {
  get(params: GetSalesParams): Promise<GetSalesModel>;
}
