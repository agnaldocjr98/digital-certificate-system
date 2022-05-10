import { RegisterSchedulingModel } from "@/domain/models";

export interface RegisterSchedulingParams {
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
}

export interface UCRegisterScheduling {
  RegisterScheduling(
    params: RegisterSchedulingParams
  ): Promise<RegisterSchedulingModel>;
}
