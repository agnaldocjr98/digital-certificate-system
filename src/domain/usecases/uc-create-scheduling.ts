import { CreateSchedulingModel } from "@/domain/models";

export interface CreateSchedulingParams {
  id: string;
  idagenda: number;
  idagtregistro: number;
  datacadastro: string;
  dataagendamento: string;
  parceiro: string;
  tipocertificado: string;
  cpfcnpj: string;
  protocolo: string;
  nome: string;
  email: string;
  telefone: string;
  clienteblip: string;
  protocolopagamento: string;
  status: string;
  idparceiro: number;
}

export interface UCCreateScheduling {
  create(params: CreateSchedulingParams): Promise<CreateSchedulingModel>;
}
