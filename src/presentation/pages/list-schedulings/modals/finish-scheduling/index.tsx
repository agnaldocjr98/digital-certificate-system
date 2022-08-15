import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { InnerContent } from "@/presentation/components/inner-content";
import { getUserData } from "@/presentation/redux/slices/user";
import { Scheduling } from "@/data/entities";
import { GetInfoSchedulingContent } from "@/domain/models";
import { Loader } from "@/presentation/components/loader";
import { CentralizeComponents } from "./centralize-components";
import { FinishSchedulingProvider } from "./useFinishScheduling";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableDataClient } from "../table-data-scheduling";
import moment from "moment";

interface FinishSchedulingProps {
  uid: string;
  scheduling: Scheduling;
}

export function FinishScheduling({ uid, scheduling }: FinishSchedulingProps) {
  const { tipo } = useSelector(getUserData);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({} as GetInfoSchedulingContent);

  async function getInfoScheduling() {
    try {
      setIsLoading(true);
      const response = await scheduling.infoScheduling({
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
    if (!(tipo === "AR" || tipo === "GE")) {
      navigate("/notfound");
      return;
    }
    getInfoScheduling();
  }, []);

  return (
    <InnerContent>
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <Loader />
        </Stack>
      ) : (
        <Stack spacing={2}>
          <TableDataClient
            schedulingdate={state.scheduling?.dataagendamento}
            name={state.customer?.nome_contato}
            protocol={state.scheduling?.protocolo}
            typecertificate={state.scheduling?.tipocertificado}
          />
          <FinishSchedulingProvider>
            <CentralizeComponents uid={uid} />
          </FinishSchedulingProvider>
        </Stack>
      )}
    </InnerContent>
  );
}
