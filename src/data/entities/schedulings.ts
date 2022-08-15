import {
  CancelSchedulingModel,
  GetSchedulingsModel,
  CreateReschedulingModel,
  CreateSchedulingModel,
  UpdateSchedulingModel,
  GetInfoSchedulingModel,
} from "@/domain/models";
import {
  CancelSchedulingParams,
  GetSchedulingsParams,
  CreateReschedulingParams,
  CreateSchedulingParams,
  UCCancelScheduling,
  UCGetSchedulings,
  UCCreateRescheduling,
  UCUpdateScheduling,
  UpdateSchedulingParams,
  UCCreateScheduling,
} from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import {
  GetInfoSchedulingParams,
  UCGetInfoScheduling,
} from "@/domain/usecases/uc-get-info-scheduling";

export class Scheduling
  implements
    UCGetSchedulings,
    UCUpdateScheduling,
    UCCreateRescheduling,
    UCCancelScheduling,
    UCCreateScheduling,
    UCGetInfoScheduling
{
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetSchedulingsParams): Promise<GetSchedulingsModel> {
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

  async create(params: CreateSchedulingParams): Promise<CreateSchedulingModel> {
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

  async update(
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
  async reschedule(
    params: CreateReschedulingParams
  ): Promise<CreateReschedulingModel> {
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

  async cancel(params: CancelSchedulingParams): Promise<CancelSchedulingModel> {
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

  async infoScheduling(
    params: GetInfoSchedulingParams
  ): Promise<GetInfoSchedulingModel> {
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
