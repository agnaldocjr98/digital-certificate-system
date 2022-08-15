import { CreateSale } from "@/presentation/pages/sales/create";
import { Sale } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeCreateSale = () => {
  const httpClient = new AxiosHttpAdapter();
  const sale = new Sale(httpClient);

  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "documento",
        fieldLabel: "CPF/CNPJ",
      })
        .required()
        .min(11)
        .max(14)
        .build(),
      ...Builder.field({
        fieldName: "tipocertificado",
        fieldLabel: "Tipo de certificado",
      })
        .required()
        .build(),
    ]);

  return <CreateSale sale={sale} validation={validation()} />;
};
