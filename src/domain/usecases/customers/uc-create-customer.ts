import { CreateCustomerModel } from "@/domain/models";

export interface CreateCustomerParams {
  telefone: string;
  id: string;
  nome_contato: string;
  voucher: string;
  menu: string;
  parceiro: string;
  ehvoucher: boolean;
  ehsemvoucher: boolean;
  ehprimeirocontato: boolean;
  email: string;
  cnpj: string;
  cpf: string;
  end_cep: string;
  end_logradouro: string;
  end_numero: string;
  end_complemento: string;
  end_bairro: string;
  end_uf: string;
  end_cidade: string;
  razao_social_pj: string;
  nome_fantasia_pj: string;
  data_fundacao_pj: string;
  telefone_pj: string;
  status_registro_pj: string;
  endpj_cep: string;
  endpj_logradouro: string;
  endpj_numero: string;
  endpj_complemento: string;
  endpj_bairro: string;
  endpj_uf: string;
  endpj_cidade: string;
  nome_admin_pj: string;
  cpf_admin_pj: string;
  datanasc_admin_pj: string;
  idparceiro: number;
}

export interface UCCreateCustomer {
  create(params: CreateCustomerParams): Promise<CreateCustomerModel>;
}
