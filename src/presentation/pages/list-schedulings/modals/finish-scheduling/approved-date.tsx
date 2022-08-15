import { useState } from "react";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFinishScheduling } from "./useFinishScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";

export const FinishSchedulingApprovedDate = () => {
  const [state, setState] = useState({
    currentDate: moment().toDate(),
    observation: "",
    isLoading: false,
  });

  const { id } = useSelector(getUserData);

  const { finishScheduling, setFinishScheduling, updateScheduling } =
    useFinishScheduling();

  function toConfirmDate() {
    setFinishScheduling({
      ...finishScheduling,
      step: 2,
      status: "E",
      observation: state.observation,
      approvedDate: `${moment(state.currentDate)
        .add(-3, "h")
        .format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
    });
  }

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
            !!finishScheduling.approvedDate && theme.colors.primary.lighter,
          pointerEvents: !!finishScheduling.approvedDate && "none",
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
              <span>2 - DATA DA APROVAÇÃO?</span>
            </Stack>
          </strong>

          <IdentiteDateTimePicker
            label="Data da aprovação"
            name="dtapprovedDate"
            size="small"
            value={state.currentDate}
            setvalue={(e) => setState({ ...state, currentDate: e })}
          />
          <Box>
            <Button variant="contained" onClick={toConfirmDate}>
              Confirmar
            </Button>
          </Box>
        </Stack>
      </Paper>
      {!!finishScheduling.approvedDate && (
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
