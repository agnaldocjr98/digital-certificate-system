import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { ConfirmedSchedulingProvider } from "./useConfirmedScheduling";
import { useNavigate } from "react-router-dom";
import { InnerContent } from "@/presentation/components/inner-content";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { toast } from "react-toastify";
import { GetInfoClientsContent } from "@/domain/models/model-get-info-client";
import { Loader } from "@/presentation/ui-components/loader";
import { CentralizeComponents } from "./centralize-components";

import moment from "moment-timezone";

interface AgentRegisterQuerySchedulingConfirmSchedulingProps {
  uid: string;
  AgentRegisterQueryScheduling: AgentRegisterQueryScheduling;
}

export function AgentRegisterQuerySchedulingConfirmScheduling({
  uid,
  AgentRegisterQueryScheduling,
}: AgentRegisterQuerySchedulingConfirmSchedulingProps) {
  const { tipo } = useSelector(getUserData);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({} as GetInfoClientsContent);

  async function getInfoClient() {
    try {
      setIsLoading(true);
      const response = await AgentRegisterQueryScheduling.getInfoClient({
        uid,
      });
      if (!response.success) {
        toast.error(response.errorMessage);
        document.title = "Cliente não encontrado!";
        setTimeout(() => {
          navigate("/notfound");
        }, 1500);
        return;
      }
      document.title = `${moment(
        response.content.scheduling.dataagendamento
      ).format("DD/MM HH:mm:ss")} - ${response.content.customer.nome_contato}`;
      setState(response.content);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!(tipo === "AV" || tipo === "GE")) {
      navigate("/notfound");
      return;
    }
    getInfoClient();
  }, []);

  return (
    <InnerContent>
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <Loader />
        </Stack>
      ) : (
        <Stack spacing={2}>
          <span>
            Data de agendamento:{" "}
            <strong>
              {" "}
              {state.scheduling
                ? moment(state.scheduling.dataagendamento).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : ""}
            </strong>
          </span>
          <span>
            Nome:{" "}
            <strong>{state.customer ? state.customer.nome_contato : ""}</strong>
          </span>
          <span>
            Protocolo:{" "}
            <strong>
              {state.scheduling ? state.scheduling.protocolo : ""}
            </strong>
          </span>
          <span>
            Tipo de certificado:{" "}
            <strong>
              {state.scheduling ? state.scheduling.tipocertificado : ""}
            </strong>
          </span>
          <ConfirmedSchedulingProvider>
            <CentralizeComponents uid={uid} />
          </ConfirmedSchedulingProvider>
        </Stack>
      )}
    </InnerContent>
  );
}
