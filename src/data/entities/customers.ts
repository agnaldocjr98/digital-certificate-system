import {
  CreateCustomerModel,
  GetCustomersContent,
  GetCustomersModel,
  UpdateCustomerModel,
} from "@/domain/models";
import {
  CreateCustomerParams,
  GetCustomersParams,
  UCCreateCustomer,
  UCGetCustomers,
  UCUpdateCustomer,
  UpdateCustomerParams,
} from "@/domain/usecases";
import { ReturnDataResponse, ReturnObjectRequest } from "@/helpers";
import { HttpClient } from "../protocols/http";

export class Customer
  implements UCGetCustomers, UCUpdateCustomer, UCCreateCustomer
{
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetCustomersParams): Promise<GetCustomersModel> {
    const data = ReturnObjectRequest("/listqueryclient", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async update(
    customer: string,
    params: Partial<UpdateCustomerParams>
  ): Promise<UpdateCustomerModel> {
    const data = ReturnObjectRequest(`/client/${customer}`, "put", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async create(params: CreateCustomerParams): Promise<CreateCustomerModel> {
    const data = ReturnObjectRequest("/client/", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }
}
