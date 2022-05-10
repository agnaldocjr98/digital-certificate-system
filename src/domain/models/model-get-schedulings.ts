import { BaseModel } from "@/domain/models";

export interface GetSchedulingsContent {
  uid: string;
  datainc: string;
  idagenda: number;
  status: string;
  dataagendamento: string;
  idagtregistro: number;
  id: string;
  datacadastro: string;
  parceiro: string;
  tipocertificado: string;
  cpfcnpj: string;
  protocolo: string;
  protocolopagamento: string;
  nome: string;
  email: string;
  telefone: string;
  clienteblip: string;
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
  agenda: {
    descricao: string;
  };
  agtregistro: {
    nome: string;
  };
  agtvideo?: {
    nome: string;
  };
  requerreagendamento: boolean;
}

export interface GetSchedulingsModel
  extends BaseModel<GetSchedulingsContent[]> {}
