import { UCAuthentication, AuthenticationParams } from "@/domain/usecases";
import { HttpClient } from "@/data/protocols/http";
import { AuthenticationModel } from "@/domain/models";
import { ReturnDataResponse, ReturnObjectRequest } from "@/helpers";

export class Authentication implements UCAuthentication {
  constructor(private readonly httpClient: HttpClient) {}

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    const data = ReturnObjectRequest("/login", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }
}
