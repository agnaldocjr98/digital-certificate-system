import {
  GetClientsModel,
  GetSchedulesModel,
  RegisterSchedulingModel,
} from "@/domain/models";
import {
  GetClientsParams,
  GetSchedulesParams,
  RegisterSchedulingParams,
  UCGetClients,
  UCGetSchedules,
  UCRegisterScheduling,
} from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

export class AgentRegisterRegisterScheduling
  implements UCGetClients, UCRegisterScheduling, UCGetSchedules
{
  constructor(private readonly httpClient: HttpClient) {}

  async getClients(params: GetClientsParams): Promise<GetClientsModel> {
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

  async RegisterScheduling(
    params: RegisterSchedulingParams
  ): Promise<RegisterSchedulingModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/registerscheduling`,
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

  async getSchedules(params: GetSchedulesParams): Promise<GetSchedulesModel> {
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
