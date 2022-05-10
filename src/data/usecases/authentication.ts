import { UCAuthentication, AuthenticationParams } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import {
  UnexpectedError,
  InvalidCredentialsError,
  ServerOffiline,
} from "@/domain/errors";
import { AuthenticationModel } from "@/domain/models";

export class Authentication implements UCAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}${this.url}`,
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
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badGateway:
        throw new ServerOffiline();
      default:
        throw new UnexpectedError();
    }
  }
}
