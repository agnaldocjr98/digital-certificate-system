import { RegisterReschedulingModel } from "@/domain/models";

export interface RegisterReschedulingParams {
  uid: string;
  idagenda: number;
  idagtregistro: number;
  dataagendamento: string;
}

export interface UCRegisterRescheduling {
  RegisterRescheduling(
    params: RegisterReschedulingParams
  ): Promise<RegisterReschedulingModel>;
}
