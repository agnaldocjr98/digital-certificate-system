import {
  CreateUserModel,
  GetUsersContent,
  GetUsersModel,
  UpdateUserModel,
} from "@/domain/models";
import { UCCreateUser, UCGetUsers, UCUpdateUser } from "@/domain/usecases";
import { ReturnDataResponse, ReturnObjectRequest } from "@/helpers";
import { HttpClient } from "../protocols/http";

export class User implements UCGetUsers, UCUpdateUser, UCCreateUser {
  constructor(private readonly httpClient: HttpClient) {}

  async get(): Promise<GetUsersModel> {
    const data = ReturnObjectRequest("/user", "get");
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async update(
    user: number,
    params: Partial<GetUsersContent>
  ): Promise<UpdateUserModel> {
    const data = ReturnObjectRequest(`/user/${user}`, "put", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }

  async create(
    params: Omit<GetUsersContent, "id" | "ativo">
  ): Promise<CreateUserModel> {
    const data = ReturnObjectRequest("/user/", "post", params);
    const httpResponse = await this.httpClient.request(data);
    return ReturnDataResponse(httpResponse.statusCode, httpResponse);
  }
}
