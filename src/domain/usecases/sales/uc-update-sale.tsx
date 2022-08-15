import { GetSalesContent, UpdateSaleModel } from "@/domain/models";

export interface UCUpdateSale {
  update(
    uid: string,
    params: Partial<Omit<GetSalesContent, "uid">>
  ): Promise<UpdateSaleModel>;
}
