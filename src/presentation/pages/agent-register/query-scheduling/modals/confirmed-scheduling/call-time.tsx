import { useState } from "react";
import { Paper, Stack, Box, Button } from "@mui/material";
import { useConfirmedScheduling } from "./useConfirmedScheduling";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { MyDatePicker } from "@/presentation/ui-components/input-datepicker";
import moment from "moment";
import { toast } from "react-toastify";

export const CallTime = () => {
  const [date, setDate] = useState<Date>(moment().toDate());
  const { getData, setData } = useConfirmedScheduling();

  function confirmedCallTime() {
    const formattedDate =
      date === null
        ? ""
        : date.toString() === "InvalidDate"
        ? ""
        : date.toString();
    if (!formattedDate) {
      toast.error("Por favor insira uma data válida");
      return;
    }
    setData({
      ...getData,
      calltime: `${moment(date).format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
    });
  }

  return (
    <Paper
      elevation={1}
      sx={{
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) =>
          !!getData.calltime && theme.colors.success.lighter,
        pointerEvents: !!getData.calltime && "none",
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
            <span>3 - QUAL A DATA DA LIGAÇÂO?</span>
          </Stack>
        </strong>

        <MyDatePicker
          label="Data da ligação"
          name="dtcalltime"
          size="small"
          value={date}
          setvalue={(e) => setDate(e)}
        />
        <Box>
          <Button variant="contained" onClick={() => confirmedCallTime()}>
            OK
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
