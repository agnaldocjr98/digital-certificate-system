import { ListCustomers } from "@/presentation/pages/customers/list";
import { Partner, User } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { Customer } from "@/data/entities/customers";

export const MakeCustomers = () => {
  const httpClient = new AxiosHttpAdapter();
  const customer = new Customer(httpClient);
  const partner = new Partner(httpClient);
  return <ListCustomers customer={customer} partner={partner} />;
};
