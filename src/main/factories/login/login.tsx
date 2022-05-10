import React from "react";
import { Login } from "@/presentation/pages/login";
import { Authentication } from "@/data/usecases/authentication";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeLogin: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const authentication = new Authentication("/login", axiosHttpClient);
  const makeLoginValidation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({ fieldName: "email", fieldLabel: "E-Mail" })
        .required()
        .email()
        .build(),
      ...Builder.field({ fieldName: "senha", fieldLabel: "Senha" })
        .required()
        .build(),
    ]);

  return (
    <Login authentication={authentication} validation={makeLoginValidation()} />
  );
};
