import { CreateUserModel, GetUsersContent } from "@/domain/models";

export interface UCCreateUser {
  create(
    params: Omit<GetUsersContent, "id" | "ativo">
  ): Promise<CreateUserModel>;
}
