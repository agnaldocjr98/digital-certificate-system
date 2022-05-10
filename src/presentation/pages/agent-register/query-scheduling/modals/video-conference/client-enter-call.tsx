import { useState } from "react";
import {
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/videoConferenceSlice";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { toast } from "react-toastify";
import { GetInfoClientsContent } from "@/domain/models/model-get-info-client";
import { Loader } from "@/presentation/ui-components/loader";
import { PaperStep } from "@/presentation/components/paper-step";
import moment from "moment";

export interface ClientEnterCallProps {
  done: boolean;
}
export const ClientEnterCall = ({ done }: ClientEnterCallProps) => {
  const payload = useSelector(useVideoConference);
  const dispatch = useDispatch();

  var clientEnter = "";
  if (payload.scheduling) {
    if (payload.scheduling.clientepresente === true) {
      clientEnter = "Sim";
    } else if (payload.scheduling.clientepresente === false) {
      clientEnter = "Não";
    }
  }
  const [state, setState] = useState({
    isLoading: false,
    isLoadingFinish: false,
    clientEnter: clientEnter,
    observation: payload.scheduling ? payload.scheduling.observacao : "",
    status: payload.scheduling.status,
  });

  async function persistStep(value: string) {
    try {
      setState({ ...state, isLoading: true });
      const params: GetInfoClientsContent = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          etapavideo: 2,
          requerreagendamento: value === "Sim" ? false : true,
          dataentrada:
            value === "Sim"
              ? `${moment().add(-3, "h").format("YYYY-MM-DDTHH:mm:ss")}.00Z`
              : null,
          clientepresente: value === "Sim" ? true : false,
        },
      };

      const response = await FunctionUpdateScheduling(
        params.scheduling as UpdateSchedulingParams
      );

      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }

      setState({ ...state, clientEnter: value });
      dispatch(setVideoConference(params));
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
    }
  }

  async function persistStepButton() {
    try {
      setState({ ...state, isLoadingFinish: true });
      const params: GetInfoClientsContent = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          observacao: state.observation,
          status: "F",
        },
      };

      const response = await FunctionUpdateScheduling(
        params.scheduling as UpdateSchedulingParams
      );

      if (!response.success) {
        setState({ ...state, isLoadingFinish: false });
        toast.error(response.errorMessage);
        return;
      }

      dispatch(setVideoConference(params));
      setState({ ...state, isLoadingFinish: false });
      toast.success("Processo finalizado com sucesso");
      setTimeout(() => {
        close();
      }, 1500);
    } catch (error) {
      setState({ ...state, isLoadingFinish: false });
      toast.error(error.message);
    }
  }

  return (
    <>
      <PaperStep done={done}>
        <strong>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <DoubleArrowIcon />
            <span>2 - CLIENTE ENTROU NA CALL?</span>
          </Stack>
        </strong>
        <RadioGroup
          row
          aria-labelledby="radioConfirmedCall"
          defaultValue=""
          value={state.clientEnter}
          name="radioConfirmedCall"
          onChange={(e) => persistStep(e.target.value)}
        >
          <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
          <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
        {done && payload.scheduling.clientepresente === true && (
          <span>
            Cliente entrou na call as{" "}
            <strong>
              {payload.scheduling
                ? moment(payload.scheduling.dataentrada).format(
                    "DD/MM/YYYY  HH:mm:ss"
                  )
                : ""}
            </strong>
          </span>
        )}
        {state.isLoading && <Loader />}
      </PaperStep>

      {state.clientEnter === "Não" && (
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            placeholder="Observação"
            multiline
            rows={4}
            value={state.observation}
            onChange={(e) =>
              setState({ ...state, observation: e.currentTarget.value })
            }
            InputProps={{ readOnly: done && state.status === "F" }}
          />
          {state.status !== "F" && (
            <Box>
              <LoadingButton
                variant="contained"
                onClick={persistStepButton}
                loading={state.isLoadingFinish}
              >
                Finalizar
              </LoadingButton>
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};
