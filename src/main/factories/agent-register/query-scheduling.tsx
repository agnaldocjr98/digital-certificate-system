import React from "react";
import { AgentRegisterQueryScheduling as Component } from "@/presentation/pages/agent-register/query-scheduling";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeAgentRegisterQueryScheduling: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const AgentRegisterQuerySchedulingInstance = new AgentRegisterQueryScheduling(
    axiosHttpClient
  );
  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "searchId",
        fieldLabel: "ID, CPF/CNPJ ou e-mail",
      })
        .required()
        .build(),
    ]);

  return (
    <Component
      AgentRegisterQuerySchedulingClass={AgentRegisterQuerySchedulingInstance}
      Validation={validation()}
    />
  );
};
