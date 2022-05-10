import { useState } from "react";
import {
  Stack,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useConfirmedScheduling } from "./useConfirmedScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { CallTime } from "./call-time";
import { toast } from "react-toastify";

export const CalledClient = () => {
  const [observation, setObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getData, setData, updateScheduling } = useConfirmedScheduling();
  const { id } = useSelector(getUserData);

  async function handleConfirmScheduling() {
    try {
      setIsLoading(true);
      const response = await updateScheduling(observation, id);
      if (!response.success) {
        setIsLoading(true);
        toast.error(response.errorMessage);
        return;
      }
      toast.success("Confirmação realizada com sucesso!");
    } catch (error) {
      setIsLoading(true);
      toast.error(error.message);
      return;
    }
  }
  return (
    <Stack spacing={1.5}>
      {getData.confirmedCall === "Não" && (
        <Paper
          elevation={1}
          sx={{
            padding: (theme) => theme.spacing(2),
            backgroundColor: (theme) =>
              !!getData.calledClient && theme.colors.success.lighter,
            pointerEvents: !!getData.calledClient && "none",
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
                <span>2 - LIGOU PARA O CLIENTE?</span>
              </Stack>
            </strong>

            <RadioGroup
              row
              aria-labelledby="radioCalledClient"
              defaultValue=""
              name="radioCalledClient"
              onChange={(e) =>
                setData({
                  ...getData,
                  calledClient: e.target.value,
                })
              }
            >
              <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="Não" control={<Radio />} label="Não" />
            </RadioGroup>
          </Stack>
        </Paper>
      )}
      {getData.calledClient === "Não" ? (
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            placeholder="Observação"
            multiline
            rows={4}
            value={observation}
            onChange={(e) => setObservation(e.currentTarget.value)}
          />
          <Box>
            <LoadingButton
              variant="contained"
              onClick={handleConfirmScheduling}
              loading={isLoading}
            >
              Finalizar
            </LoadingButton>
          </Box>
        </Stack>
      ) : (
        getData.calledClient === "Sim" && <CallTime />
      )}
    </Stack>
  );
};
