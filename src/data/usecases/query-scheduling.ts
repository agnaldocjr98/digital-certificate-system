import {
  CancelSchedulingModel,
  GetSchedulesModel,
  GetSchedulingsModel,
  RegisterReschedulingModel,
  UpdateSchedulingModel,
} from "@/domain/models";
import {
  CancelSchedulingParams,
  GetSchedulesParams,
  GetSchedulingsParams,
  RegisterReschedulingParams,
  UCCancelScheduling,
  UCGetSchedules,
  UCGetSchedulings,
  UCRegisterRescheduling,
  UCUpdateScheduling,
  UpdateSchedulingParams,
} from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import {
  GetInfoClientParams,
  UCGetInfoClient,
} from "@/domain/usecases/uc-get-info-client";
import { GetInfoClientModel } from "@/domain/models/model-get-info-client";

export class AgentRegisterQueryScheduling
  implements
    UCGetSchedulings,
    UCUpdateScheduling,
    UCRegisterRescheduling,
    UCGetSchedules,
    UCCancelScheduling,
    UCGetInfoClient
{
  constructor(private readonly httpClient: HttpClient) {}

  async getSchedulings(
    params: GetSchedulingsParams
  ): Promise<GetSchedulingsModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/queryscheduling`,
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

  async UpdateScheduling(
    params: Partial<UpdateSchedulingParams>
  ): Promise<UpdateSchedulingModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/updatescheduling`,
      method: "put",
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
  async RegisterRescheduling(
    params: RegisterReschedulingParams
  ): Promise<RegisterReschedulingModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/registerreschedule`,
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

  async cancelScheduling(
    params: CancelSchedulingParams
  ): Promise<CancelSchedulingModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/cancelscheduling`,
      method: "put",
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

  async getInfoClient(
    params: GetInfoClientParams
  ): Promise<GetInfoClientModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.API_BASEURL}/getinfoscheduling`,
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
