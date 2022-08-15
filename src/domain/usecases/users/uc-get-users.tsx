import { GetUsersModel } from "@/domain/models";

export interface UCGetUsers {
  get(): Promise<GetUsersModel>;
}
