import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useConfirmedScheduling } from "./useConfirmedScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";

export const Tool = () => {
  const { getData, setData, updateScheduling } = useConfirmedScheduling();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useSelector(getUserData);

  async function handleConfirmScheduling() {
    try {
      setIsLoading(true);
      const response = await updateScheduling("", id);
      if (!response.success) {
        setIsLoading(false);
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
    <>
      {getData.confirmedCall === "Sim" && (
        <Paper
          elevation={1}
          sx={{
            padding: (theme) => theme.spacing(2),
            backgroundColor: (theme) =>
              !!getData.tool && theme.colors.success.lighter,
            pointerEvents: !!getData.tool && "none",
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
                <span>2 - A CONFIRMAÇÃO FOI FEITA POR QUAL FERRAMENTA?</span>
              </Stack>
            </strong>
            <RadioGroup
              row
              aria-labelledby="radiotool"
              defaultValue=""
              name="radiotool"
              onChange={(e) =>
                setData({
                  ...getData,
                  tool: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="Ligação"
                control={<Radio />}
                label="Ligação"
              />
              <FormControlLabel
                value="WhatsApp"
                control={<Radio />}
                label="WhatsApp"
              />
              <FormControlLabel value="SMS" control={<Radio />} label="SMS" />
            </RadioGroup>
          </Stack>
        </Paper>
      )}
      {!!getData.tool && (
        <Box>
          <LoadingButton
            variant="contained"
            onClick={handleConfirmScheduling}
            loading={isLoading}
          >
            Finalizar
          </LoadingButton>
        </Box>
      )}
    </>
  );
};
