import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { GetDashboardsModel } from "@/domain/models";
import { GetDashboardsParams, UCGetDashboards } from "@/domain/usecases";

export class Dashboard implements UCGetDashboards {
  constructor(private readonly httpClient: HttpClient) {}
  async get(params: GetDashboardsParams): Promise<GetDashboardsModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/dashboard1`,
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
