import { Scheduling } from "@/data/entities";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { AxiosHttpAdapter } from "@/infra/http";

export const FunctionUpdateScheduling = (
  params: Partial<UpdateSchedulingParams>
) => {
  const httpAdapter = new AxiosHttpAdapter();
  const scheduling = new Scheduling(httpAdapter);

  const response = scheduling.update(params);
  return response;
};
