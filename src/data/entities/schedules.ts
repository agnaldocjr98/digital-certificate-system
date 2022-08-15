import { GetSchedulesModel } from "@/domain/models";
import { GetSchedulesParams, UCGetSchedules } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

export class Schedule implements UCGetSchedules {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetSchedulesParams): Promise<GetSchedulesModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/queryschedule`,
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
