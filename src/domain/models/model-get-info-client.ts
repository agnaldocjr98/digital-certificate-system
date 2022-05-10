import { BaseModel } from "@/domain/models";

export interface GetInfoClientCustomer {
  uid: string;
  telefone: string;
  id: string;
  nome_contato: string;
  voucher: string;
  datacad: string;
  menu: string;
  parceiro: string;
  ehvoucher: boolean;
  ehsemvoucher: boolean;
  ehvoucherdigitado: boolean;
  ehprimeirocontato: boolean;
  email: string;
  cnpj: string;
  cpf: string;
  endereco: string;
  cnhfrente: string;
  cnhverso: string;
  rgfrente: string;
  rgverso: string;
  contratosocial: string;
  psbio: string;
  razao_social_pj: string;
  nome_fantasia_pj: string;
  data_fundacao_pj: string;
  telefone_pj: string;
  status_registro_pj: string;
  endereco_pj: string;
  nome_admin_pj: string;
  cpf_admin_pj: string;
  datanasc_admin_pj: string;
}

export interface GetInfoClientScheduling {
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
  requerreagendamento: boolean;
  protocolopagamento: string;
  tipoconfirmacao: string;
  datacancelamento: string;
  etapavideo: number;
  dataligacao: string;
}

export interface GetInfoClientsContent {
  customer: GetInfoClientCustomer;
  scheduling: GetInfoClientScheduling;
}

export interface GetInfoClientModel extends BaseModel<GetInfoClientsContent> {}
