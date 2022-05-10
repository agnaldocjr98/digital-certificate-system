import { useState } from "react";
import { useFinishScheduling } from "./useFinishScheduling";
import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";

export const FinishSchedulingErrorVideoDoc = () => {
  const [state, setState] = useState({
    isLoading: false,
    observation: "",
  });

  const { id } = useSelector(getUserData);

  const { finishScheduling, setFinishScheduling, updateScheduling } =
    useFinishScheduling();

  async function handleConfirmScheduling() {
    try {
      setState({ ...state, isLoading: true });
      const response = await updateScheduling(state.observation, id);
      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }
      setState({ ...state, isLoading: false });
      toast.success("Finalização de agendamento realizada com sucesso!");
      setTimeout(() => {
        close();
      }, 1500);
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
      return;
    }
  }

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          padding: (theme) => theme.spacing(2),
          backgroundColor: (theme) =>
            !!finishScheduling.errorVideoDoc && theme.colors.success.lighter,
          pointerEvents: !!finishScheduling.errorVideoDoc && "none",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ sx: "flex-start", md: "center" }}
          justifyContent={{ sx: "center", md: "flex-start" }}
        >
          <strong>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <DoubleArrowIcon />
              <span>2 - ERRO DOCUMENTAL OU ERRO DE VÍDEO?</span>
            </Stack>
          </strong>
          <RadioGroup
            row
            aria-labelledby="radioerrorvideodoc"
            defaultValue=""
            name="radioerrorvideodoc"
            onChange={(e) =>
              setFinishScheduling({
                ...finishScheduling,
                step: 2,
                errorVideoDoc: e.target.value,
                status: e.target.value === "D" ? "F" : finishScheduling.status,
              })
            }
          >
            <FormControlLabel
              value="D"
              control={<Radio />}
              label="Documental"
            />
            <FormControlLabel value="V" control={<Radio />} label="Vídeo" />
          </RadioGroup>
        </Stack>
      </Paper>
      {!!finishScheduling.errorVideoDoc && (
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
          />
          <Box>
            <LoadingButton
              variant="contained"
              onClick={handleConfirmScheduling}
              loading={state.isLoading}
            >
              Finalizar
            </LoadingButton>
          </Box>
        </Stack>
      )}
    </>
  );
};
