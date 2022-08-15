import React from "react";
import { ListSchedulings as Component } from "@/presentation/pages/list-schedulings";
import { Scheduling } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeListSchedulings: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);

  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "searchId",
        fieldLabel: "ID, CPF/CNPJ ou e-mail",
      })
        .required()
        .build(),
    ]);

  return <Component scheduling={scheduling} validation={validation()} />;
};
