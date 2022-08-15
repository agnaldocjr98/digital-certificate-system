import { createContext, useState, useContext } from "react";
import { Scheduling } from "@/data/entities";
import { UpdateSchedulingModel } from "@/domain/models";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { AxiosHttpAdapter } from "@/infra/http";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSchedulings } from "@/presentation/redux/slices/schedulings";

interface ConfirmScheduling {
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

interface ConfirmSchedulingContext {
  getData: ConfirmScheduling;
  setData: (data: ConfirmScheduling) => void;
  updateScheduling: (
    obervation: string,
    iduser: number
  ) => Promise<UpdateSchedulingModel>;
}

interface ConfirmedSchedulingProvider {
  children: React.ReactNode;
}

const ConfirmSchedulingContext = createContext({} as ConfirmSchedulingContext);

const ConfirmSchedulingProvider = ({
  children,
}: ConfirmedSchedulingProvider) => {
  const [dataScheduling, setDataScheduling] = useState<ConfirmScheduling>(
    {} as ConfirmScheduling
  );

  function PayloadConfirmScheduling(observation: string) {
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

  const dispacth = useDispatch();
  async function updateScheduling(observation: string, iduser: number) {
    const httpAdapter = new AxiosHttpAdapter();
    const scheduling = new Scheduling(httpAdapter);
    const params = PayloadConfirmScheduling(observation);

    const response = await scheduling.update({
      ...params,
      idagtvideo: iduser,
    });
    if (response.success) {
      setDataScheduling((currentState) => ({
        ...currentState,
        persisted: true,
      }));
      dispacth(setSchedulings(params));
    }

    return response;
  }

  return (
    <ConfirmSchedulingContext.Provider
      value={{
        getData: dataScheduling,
        setData: setDataScheduling,
        updateScheduling,
      }}
    >
      {children}
    </ConfirmSchedulingContext.Provider>
  );
};

function useConfirmScheduling() {
  const context = useContext(ConfirmSchedulingContext);
  return context;
}

export { useConfirmScheduling, ConfirmSchedulingProvider };
