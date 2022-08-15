import { useState } from "react";
import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useConfirmScheduling } from "./useConfirmScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import { toast } from "react-toastify";

export const ReconfirmedClient = () => {
  const [observation, setObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getData, setData, updateScheduling } = useConfirmScheduling();
  const { id } = useSelector(getUserData);

  async function handleConfirmScheduling() {
    try {
      setIsLoading(true);
      const response = await updateScheduling(observation, id);
      if (!response.success) {
        setIsLoading(false);
        toast.error(response.errorMessage);
        return;
      }
      toast.success("Confirmação realizada com sucesso!");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
  }
  return (
    <>
      {getData.calltime && (
        <Stack spacing={1.5}>
          <Paper
            elevation={1}
            sx={{
              padding: (theme) => theme.spacing(2),
              backgroundColor: (theme) =>
                !!getData.confirmedAfter && theme.colors.primary.lighter,
              pointerEvents: !!getData.confirmedAfter && "none",
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
                  <span>4 - CLIENTE CONFIRMOU A CALL APÓS LIGAÇÃO?</span>
                </Stack>
              </strong>

              <RadioGroup
                row
                aria-labelledby="radioconfirmedAfter"
                defaultValue=""
                name="radioconfirmedAfter"
                onChange={(e) =>
                  setData({
                    ...getData,
                    confirmedAfter: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </Stack>
          </Paper>
          {!!getData.confirmedAfter && (
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
          )}
        </Stack>
      )}
    </>
  );
};
