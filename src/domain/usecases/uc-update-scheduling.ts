import { UpdateSchedulingModel } from "../models";

export interface UpdateSchedulingParams {
  uid: string;
  idagtvideo: number;
  dataconfirmacao: string;
  datainicio: string;
  dataentrada: string;
  datafim: string;
  confirmadoagendamento: boolean;
  ligou: boolean;
  emvideoconferencia: boolean;
  foiemitido: boolean;
  clientepresente: boolean;
  tempendencia: boolean;
  ehpresencial: boolean;
  aprovado: boolean;
  datareagendamento: string;
  dataaprovacao: string;
  observacao: string;
  tipoconfirmacao: string;
  requerreagendamento: boolean;
  status: string;
  dataligacao: string;
}

export interface UCUpdateScheduling {
  update(
    params: Partial<UpdateSchedulingParams>
  ): Promise<UpdateSchedulingModel>;
}
