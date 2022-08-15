import { CreateReschedulingModel } from "@/domain/models";

export interface CreateReschedulingParams {
  uid: string;
  idagenda: number;
  idagtregistro: number;
  dataagendamento: string;
}

export interface UCCreateRescheduling {
  reschedule(
    params: CreateReschedulingParams
  ): Promise<CreateReschedulingModel>;
}
