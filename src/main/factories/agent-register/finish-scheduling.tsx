import React from "react";
import { AgentRegisterQuerySchedulingFinishScheduling as Component } from "@/presentation/pages/agent-register/query-scheduling/modals/finish-scheduling";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import { useParams } from "react-router";

export const MakeAgentRegisterFinishScheduling: React.FC = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const AgentRegisterQuerySchedulingInstance = new AgentRegisterQueryScheduling(
    axiosHttpClient
  );
  const { id } = useParams();
  return (
    <Component
      uid={id}
      AgentRegisterQueryScheduling={AgentRegisterQuerySchedulingInstance}
    />
  );
};
