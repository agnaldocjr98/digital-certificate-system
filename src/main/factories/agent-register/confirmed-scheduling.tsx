import React from "react";
import { AgentRegisterQuerySchedulingConfirmScheduling as Component } from "@/presentation/pages/agent-register/query-scheduling/modals/confirmed-scheduling";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import { useParams } from "react-router";

export const MakeAgentRegisterConfirmedScheduling: React.FC = () => {
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
