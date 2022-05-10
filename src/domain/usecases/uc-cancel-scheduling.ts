import { CancelSchedulingModel } from "@/domain/models";

export interface CancelSchedulingParams {
  uid: string;
  datacancelamento: string;
}

export interface UCCancelScheduling {
  cancelScheduling(
    params: CancelSchedulingParams
  ): Promise<CancelSchedulingModel>;
}
