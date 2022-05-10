import React from "react";
import { AgentRegisterScheduling as Component } from "@/presentation/pages/agent-register/register-scheduling";
import { AgentRegisterRegisterScheduling } from "@/data/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeAgentRegisterRegisterScheduling: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const AgentRegisterRegisterSchedulingInstance =
    new AgentRegisterRegisterScheduling(axiosHttpClient);

  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "searchId",
        fieldLabel: "ID, CPF ou e-mail",
      })
        .required()
        .build(),
      ...Builder.field({ fieldName: "initialDate", fieldLabel: "Data Inicial" })
        .required()
        .build(),
      ...Builder.field({ fieldName: "finalDate", fieldLabel: "Data Final" })
        .required()
        .build(),
    ]);

  return (
    <Component
      AgentRegisterRegisterSchedulingClass={
        AgentRegisterRegisterSchedulingInstance
      }
      Validation={validation()}
    />
  );
};
