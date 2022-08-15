import { CancelSchedulingModel } from "@/domain/models";

export interface CancelSchedulingParams {
  uid: string;
  datacancelamento: string;
}

export interface UCCancelScheduling {
  cancel(params: CancelSchedulingParams): Promise<CancelSchedulingModel>;
}
