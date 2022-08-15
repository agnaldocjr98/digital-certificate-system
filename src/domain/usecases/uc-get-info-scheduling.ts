import { GetInfoSchedulingModel } from "@/domain/models";

export interface GetInfoSchedulingParams {
  uid: string;
}

export interface UCGetInfoScheduling {
  infoScheduling(
    params: GetInfoSchedulingParams
  ): Promise<GetInfoSchedulingModel>;
}
