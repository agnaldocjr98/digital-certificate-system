import {
  CreateSaleContent,
  CreateSaleModel,
  GetSalesContent,
  GetSalesModel,
  UpdateSaleModel,
} from "@/domain/models";
import {
  UCGetSales,
  UCCreateSale,
  GetSalesParams,
  UCUpdateSale,
  CreateSaleParams,
} from "@/domain/usecases";
import { ReturnDataResponse, ReturnObjectRequest } from "@/helpers";
import { HttpClient } from "../protocols/http";

export class Sale implements UCGetSales, UCCreateSale, UCUpdateSale {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetSalesParams): Promise<GetSalesModel> {
    const data = ReturnObjectRequest("/querysales", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async create(params: CreateSaleParams): Promise<CreateSaleModel> {
    const data = ReturnObjectRequest("/sale/", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async update(
    uid: string,
    params: Partial<Omit<GetSalesContent, "uid">>
  ): Promise<UpdateSaleModel> {
    const data = ReturnObjectRequest(`/sale/${uid}`, "put", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }
}
