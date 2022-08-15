import { ListSales } from "@/presentation/pages/sales";
import { AxiosHttpAdapter } from "@/infra/http";
import { Sale } from "@/data/entities";

export const MakeSales = () => {
  const httpClient = new AxiosHttpAdapter();
  const sale = new Sale(httpClient);

  return <ListSales sale={sale} />;
};
