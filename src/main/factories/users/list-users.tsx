import { ListUsers } from "@/presentation/pages/users";
import { User } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";

export const MakeUsers = () => {
  const httpClient = new AxiosHttpAdapter();
  const user = new User(httpClient);
  return <ListUsers user={user} />;
};
