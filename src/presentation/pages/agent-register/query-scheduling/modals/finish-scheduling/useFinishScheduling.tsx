import { createContext, useState, useContext } from "react";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { UpdateSchedulingModel } from "@/domain/models";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { AxiosHttpAdapter } from "@/infra/http";

interface FinishScheduling {
  step: number;
  uid: string;
  approved: string;
  approvedDate: string;
  observation: string;
  status: string;
  errorVideoDoc: string;
}

interface FinishSchedulingContext {
  finishScheduling: FinishScheduling;
  setFinishScheduling: (data: FinishScheduling) => void;
  updateScheduling: (
    obervation: string,
    iduser: number
  ) => Promise<UpdateSchedulingModel>;
}

interface FinishSchedulingProvider {
  children: React.ReactNode;
}

const FinishSchedulingContext = createContext({} as FinishSchedulingContext);

const FinishSchedulingProvider = ({ children }: FinishSchedulingProvider) => {
  const [dataScheduling, setDataScheduling] = useState<FinishScheduling>({
    step: 0,
  } as FinishScheduling);

  function returnsPayloadFinishScheduling(observation: string) {
    const payload = {} as Partial<UpdateSchedulingParams>;
    payload.uid = dataScheduling.uid;
    payload.status = dataScheduling.status;
    payload.aprovado = dataScheduling.approved === "Sim" ? true : false;
    if (dataScheduling.approvedDate)
      payload.dataaprovacao = dataScheduling.approvedDate;
    if (observation) payload.observacao = observation;
    if (dataScheduling.errorVideoDoc === "V") {
      payload.requerreagendamento = true;
    }
    return payload;
  }

  async function updateScheduling(observation: string, iduser: number) {
    const AxiosHttpAdapt = new AxiosHttpAdapter();
    const AgentRegisterQuerySchedulingInstance =
      new AgentRegisterQueryScheduling(AxiosHttpAdapt);

    const params = returnsPayloadFinishScheduling(observation);

    const response =
      await AgentRegisterQuerySchedulingInstance.UpdateScheduling({
        ...params,
        idagtvideo: iduser,
      });
    if (response.success)
      setDataScheduling((currentState) => ({
        ...currentState,
        persisted: true,
      }));
    return response;
  }

  return (
    <FinishSchedulingContext.Provider
      value={{
        finishScheduling: dataScheduling,
        setFinishScheduling: setDataScheduling,
        updateScheduling,
      }}
    >
      {children}
    </FinishSchedulingContext.Provider>
  );
};

function useFinishScheduling() {
  const context = useContext(FinishSchedulingContext);
  return context;
}

export { useFinishScheduling, FinishSchedulingProvider };
