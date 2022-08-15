import { GetUsersContent, UpdateUserModel } from "@/domain/models";

export interface UCUpdateUser {
  update(
    user: number,
    params: Partial<GetUsersContent>
  ): Promise<UpdateUserModel>;
}
