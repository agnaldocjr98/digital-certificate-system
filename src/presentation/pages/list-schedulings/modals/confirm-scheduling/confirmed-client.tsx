import {
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@mui/material";
import { useConfirmScheduling } from "./useConfirmScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

interface ConfirmedClientProps {
  uid: string;
}
export const ConfirmedClient = ({ uid }: ConfirmedClientProps) => {
  const { getData, setData } = useConfirmScheduling();
  return (
    <Paper
      elevation={1}
      sx={{
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) =>
          !!getData.confirmedCall && theme.colors.primary.lighter,
        pointerEvents: !!getData.confirmedCall && "none",
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
            <span>1 - CLIENTE CONFIRMOU A CALL?</span>
          </Stack>
        </strong>
        <RadioGroup
          row
          aria-labelledby="radioConfirmedCall"
          defaultValue=""
          name="radioConfirmedCall"
          onChange={(e) =>
            setData({
              ...getData,
              confirmedCall: e.target.value,
              confirmedScheduling: e.target.value === "Sim" ? true : false,
              uid,
            })
          }
        >
          <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
          <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
      </Stack>
    </Paper>
  );
};
