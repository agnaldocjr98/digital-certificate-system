import { GetPartnersModel } from "@/domain/models";
import { UCGetPartners } from "@/domain/usecases";
import { ReturnDataResponse, ReturnObjectRequest } from "@/helpers";
import { HttpClient } from "../protocols/http";

export class Partner implements UCGetPartners {
  constructor(private readonly httpClient: HttpClient) {}
  async get(): Promise<GetPartnersModel> {
    const data = ReturnObjectRequest("/partner", "get");
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }
}
