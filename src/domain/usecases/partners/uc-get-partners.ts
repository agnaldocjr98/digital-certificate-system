import { GetPartnersModel } from "@/domain/models";

export interface UCGetPartners {
  get(): Promise<GetPartnersModel>;
}
