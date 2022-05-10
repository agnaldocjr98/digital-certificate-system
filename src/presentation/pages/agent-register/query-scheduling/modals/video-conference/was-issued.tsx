import { useState } from "react";
import {
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  TextField,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Loader } from "@/presentation/ui-components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/videoConferenceSlice";
import { GetInfoClientsContent } from "@/domain/models/model-get-info-client";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { toast } from "react-toastify";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { PaperStep } from "@/presentation/components/paper-step";

interface WasIssuedProps {
  done: boolean;
}

export const WasIssued = ({ done }: WasIssuedProps) => {
  const payload = useSelector(useVideoConference);
  const dispatch = useDispatch();

  var wasIssued = "";

  if (payload.scheduling) {
    if (payload.scheduling.foiemitido === true) {
      wasIssued = "Sim";
    } else if (payload.scheduling.foiemitido === false) {
      wasIssued = "Não";
    }
  }

  const [state, setState] = useState({
    isLoading: false,
    isLoadingFinish: false,
    wasIssued: wasIssued,
    observation: payload.scheduling.observacao,
    status: payload.scheduling.status,
  });

  async function persistStep(value: string) {
    try {
      setState({ ...state, isLoading: true });
      const params: GetInfoClientsContent = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          etapavideo: 4,
          foiemitido: value === "Sim" ? true : false,
          status: value === "Sim" ? "F" : payload.scheduling.status,
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

      setState({ ...state, wasIssued: value });
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
            <span>4 - O CERTIFICADO FOI EMITIDO?</span>
          </Stack>
        </strong>
        <RadioGroup
          row
          aria-labelledby="radiowasissued"
          defaultValue=""
          value={state.wasIssued}
          name="radiowasissued"
          onChange={(e) => persistStep(e.target.value)}
        >
          <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
          <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
        {state.isLoading && <Loader />}
      </PaperStep>
      {state.wasIssued === "Sim" && (
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
