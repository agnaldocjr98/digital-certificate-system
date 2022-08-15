import React from "react";
import { CreateScheduling } from "@/presentation/pages/create-scheduling";
import { Client, Schedule, Scheduling } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeCreateScheduling: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);
  const schedule = new Schedule(axiosHttpClient);
  const client = new Client(axiosHttpClient);

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
    <CreateScheduling
      scheduling={scheduling}
      schedule={schedule}
      client={client}
      validation={validation()}
    />
  );
};
