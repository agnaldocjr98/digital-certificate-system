import { GetClientsModel } from "@/domain/models";
import { GetClientsParams, UCGetClients } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

export class Client implements UCGetClients {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetClientsParams): Promise<GetClientsModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/queryclient`,
      method: "post",
      body: params,
      headers: {
        "Content-type": "application/json",
        Authorization: process.env.REACT_APP_AUTH_HEADER,
      },
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.created:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
