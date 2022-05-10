import {
  Paper,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useFinishScheduling } from "./useFinishScheduling";

interface FinishSchedulingWasApprovedProps {
  uid: string;
}

export const FinishSchedulingWasApproved = ({
  uid,
}: FinishSchedulingWasApprovedProps) => {
  const { finishScheduling, setFinishScheduling } = useFinishScheduling();

  return (
    <Paper
      elevation={1}
      sx={{
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) =>
          !!finishScheduling.approved && theme.colors.success.lighter,
        pointerEvents: !!finishScheduling.approved && "none",
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
            <span>1 - FOI APROVADO NA AC?</span>
          </Stack>
        </strong>
        <RadioGroup
          row
          aria-labelledby="radiowasapproved"
          defaultValue=""
          name="radiowasapproved"
          onChange={(e) =>
            setFinishScheduling({
              ...finishScheduling,
              step: 1,
              uid,
              approved: e.target.value,
              status: e.target.value === "Sim" ? "R" : finishScheduling.status,
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
