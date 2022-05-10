import { createContext, useState, useContext } from "react";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { UpdateSchedulingModel } from "@/domain/models";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import moment from "moment";
import { add } from "date-fns";

interface ConfirmedScheduling {
  uid: string;
  confirmedCall: string;
  tool: string;
  calledClient: string;
  observation: string;
  confirmedAfter: string;
  calltime: string;
  persisted: boolean;
  confirmedScheduling: boolean;
}

interface ConfirmedSchedulingContext {
  getData: ConfirmedScheduling;
  setData: (data: ConfirmedScheduling) => void;
  updateScheduling: (
    obervation: string,
    iduser: number
  ) => Promise<UpdateSchedulingModel>;
}

interface ConfirmedSchedulingProvider {
  children: React.ReactNode;
}

const ConfirmedSchedulingContext = createContext(
  {} as ConfirmedSchedulingContext
);

const ConfirmedSchedulingProvider = ({
  children,
}: ConfirmedSchedulingProvider) => {
  const [dataScheduling, setDataScheduling] = useState<ConfirmedScheduling>(
    {} as ConfirmedScheduling
  );

  function returnsPayloadConfirmedScheduling(observation: string) {
    const payload = {} as Partial<UpdateSchedulingParams>;

    payload.uid = dataScheduling.uid;
    payload.confirmadoagendamento = dataScheduling.confirmedScheduling;

    if (dataScheduling.confirmedCall === "Sim") {
      if (dataScheduling.tool) {
        if (dataScheduling.tool === "Ligação") {
          payload.ligou = true;
          payload.tipoconfirmacao = "L";
          payload.dataligacao = `${moment()
            .add(-3, "h")
            .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
        } else if (dataScheduling.tool === "WhatsApp") {
          payload.tipoconfirmacao = "W";
        } else if (dataScheduling.tool === "SMS") {
          payload.tipoconfirmacao = "S";
        }
      }
      payload.status = "C";
      payload.confirmadoagendamento = true;
      payload.dataconfirmacao = `${moment()
        .add(-3, "h")
        .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
    } else if (dataScheduling.confirmedCall === "Não") {
      if (dataScheduling.confirmedAfter === "Sim") {
        payload.status = "C";
        payload.confirmadoagendamento = true;
        payload.tipoconfirmacao = "L";
        payload.dataconfirmacao = `${moment()
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
      } else if (dataScheduling.confirmedAfter === "Não") {
        payload.confirmadoagendamento = false;
        payload.requerreagendamento = true;
      }
      payload.ligou = true;
      payload.dataligacao = `${moment(dataScheduling.calltime)
        .add(-3, "h")
        .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
    }
    payload.observacao = observation ? observation : "";
    return payload;
  }

  async function updateScheduling(observation: string, iduser: number) {
    const AxiosHttpAdapt = new AxiosHttpAdapter();
    const AgentRegisterQuerySchedulingInstance =
      new AgentRegisterQueryScheduling(AxiosHttpAdapt);
    const params = returnsPayloadConfirmedScheduling(observation);

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
    <ConfirmedSchedulingContext.Provider
      value={{
        getData: dataScheduling,
        setData: setDataScheduling,
        updateScheduling,
      }}
    >
      {children}
    </ConfirmedSchedulingContext.Provider>
  );
};

function useConfirmedScheduling() {
  const context = useContext(ConfirmedSchedulingContext);
  return context;
}

export { useConfirmedScheduling, ConfirmedSchedulingProvider };
