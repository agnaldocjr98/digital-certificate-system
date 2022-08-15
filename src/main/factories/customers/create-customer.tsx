import { CreateCustomer } from "@/presentation/pages/customers/create";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";
import { Customer } from "@/data/entities/customers";
import { Partner } from "@/data/entities";

export const MakeCreateCustomer = () => {
  const httpClient = new AxiosHttpAdapter();
  const customer = new Customer(httpClient);
  const partner = new Partner(httpClient);

  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "id",
        fieldLabel: "ID.",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "telefone",
        fieldLabel: "Telefone",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "nome_contato",
        fieldLabel: "Nome",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "voucher",
        fieldLabel: "Voucher",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "idparceiro",
        fieldLabel: "Parceiro",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "email",
        fieldLabel: "E-mail",
      })
        .required()
        .email()
        .build(),
      ...Builder.field({
        fieldName: "end_logradouro",
        fieldLabel: "Logradouro",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "end_numero",
        fieldLabel: "Número",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "end_bairro",
        fieldLabel: "Bairro",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "end_uf",
        fieldLabel: "UF",
      })
        .required()
        .min(2)
        .max(2)
        .build(),
      ...Builder.field({
        fieldName: "end_cidade",
        fieldLabel: "Cidade",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "end_cep",
        fieldLabel: "F CEP",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "endpj_logradouro",
        fieldLabel: "Logradouro",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "endpj_numero",
        fieldLabel: "Número",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "endpj_bairro",
        fieldLabel: "Bairro",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "endpj_uf",
        fieldLabel: "UF",
      })
        .required()
        .min(2)
        .max(2)
        .build(),
      ...Builder.field({
        fieldName: "endpj_cidade",
        fieldLabel: "Cidade",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "endpj_cep",
        fieldLabel: "J CEP",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "cpf",
        fieldLabel: "CPF",
      })
        .required()
        .min(11)
        .max(11)
        .build(),
      ...Builder.field({
        fieldName: "razao_social_pj",
        fieldLabel: "Razão Social",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "nome_fantasia_pj",
        fieldLabel: "Nome Fantasia",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "cnpj",
        fieldLabel: "CNPJ",
      })
        .required()
        .min(14)
        .max(14)
        .build(),
      ...Builder.field({
        fieldName: "nome_admin_pj",
        fieldLabel: "Nome do representante",
      })
        .required()
        .build(),
    ]);

  return (
    <CreateCustomer
      customer={customer}
      partner={partner}
      validation={validation()}
    />
  );
};
