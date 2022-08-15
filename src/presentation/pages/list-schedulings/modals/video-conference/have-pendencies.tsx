import { useState } from "react";
import {
  FormControlLabel,
  Paper,
  Stack,
  Radio,
  RadioGroup,
  TextField,
  Box,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { Loader } from "@/presentation/components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/video-conference";
import { GetInfoSchedulingContent } from "@/domain/models";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { toast } from "react-toastify";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { PaperStep } from "@/presentation/components/paper-step";

interface HavePendenciesProps {
  done: boolean;
}

export const HavePendencies = ({ done }: HavePendenciesProps) => {
  const payload = useSelector(useVideoConference);
  const dispatch = useDispatch();

  var havePendencies = "";

  if (payload.scheduling) {
    if (payload.scheduling.tempendencia === true) {
      havePendencies = "Sim";
    } else if (payload.scheduling.tempendencia === false) {
      havePendencies = "Não";
    }
  }

  const [state, setState] = useState({
    isLoading: false,
    isLoadingFinish: false,
    havePendencies: havePendencies,
    observation: payload.scheduling.observacao,
    status: payload.scheduling.status,
  });

  async function persistStep(value: string) {
    try {
      setState({ ...state, isLoading: true });
      const params: GetInfoSchedulingContent = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          etapavideo: 6,
          tempendencia: value === "Sim" ? true : false,
          status: value === "Não" ? "F" : payload.scheduling.status,
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

      setState({ ...state, havePendencies: value });
      dispatch(setVideoConference(params));
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
    }
  }

  async function persistStepButton() {
    try {
      setState({ ...state, isLoadingFinish: true });
      const params: GetInfoSchedulingContent = {
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
            <span>6 - TEM PENDÊNCIAS?</span>
          </Stack>
        </strong>
        <RadioGroup
          row
          aria-labelledby="radiowasissued"
          defaultValue=""
          value={state.havePendencies}
          name="radiowasissued"
          onChange={(e) => persistStep(e.target.value)}
        >
          <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
          <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
        {state.isLoading && <Loader />}
      </PaperStep>

      {!!state.havePendencies && (
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
