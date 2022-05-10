import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { AxiosHttpAdapter } from "@/infra/http";

export const FunctionUpdateScheduling = (
  scheduling: UpdateSchedulingParams
) => {
  const AxiosHttpAdapt = new AxiosHttpAdapter();
  const AgentRegisterQuerySchedulingInstance = new AgentRegisterQueryScheduling(
    AxiosHttpAdapt
  );

  const response =
    AgentRegisterQuerySchedulingInstance.UpdateScheduling(scheduling);
  return response;
};
