import React, { useState } from "react";
import { MyDatePicker } from "@/presentation/ui-components/input-datepicker";
import { Box, Theme, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import AgentRegisterToScheduleSchedules from "./schedule";
import { GetSchedulesContent } from "@/domain/models";
import { AgentRegisterRegisterScheduling } from "@/data/usecases";
import { Validation } from "@/presentation/protocols/validation";
import { DefaultDateSchedule } from "@/helpers";
import { toast } from "react-toastify";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
  datewrapper: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  containerLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  containermain: {
    height: "100%",
  },
}));

interface AgentRegisterToScheduleProps {
  AgentRegisterRegisterSchedulingClass: AgentRegisterRegisterScheduling;
  Validation: Validation;
}

export const AgentRegisterToSchedule = ({
  AgentRegisterRegisterSchedulingClass,
  Validation,
}: AgentRegisterToScheduleProps) => {
  const defaultDates = DefaultDateSchedule();
  const [state, setState] = useState({
    isLoadingSearchScheduling: false,
    initialDate: defaultDates.startDate,
    finalDate: defaultDates.finalDate,
    schedules: [] as GetSchedulesContent[],
  });
  const classes = useStyles();

  async function HandlegetSchedules(e: React.FormEvent) {
    e.preventDefault();
    try {
      const iniDate =
        state.initialDate === null
          ? ""
          : state.initialDate.toString() === "InvalidDate"
          ? ""
          : state.initialDate.toString();
      const errorDI = Validation.validate("initialDate", iniDate);
      if (errorDI) {
        toast.info(errorDI);
        return;
      }
      const FinDate =
        state.finalDate === null
          ? ""
          : state.finalDate.toString() === "InvalidDate"
          ? ""
          : state.finalDate.toString();
      const errorDF = Validation.validate("finalDate", FinDate);
      if (errorDF) {
        toast.info(errorDF);
        return;
      }

      if (state.initialDate > state.finalDate) {
        toast.info("A Data inicial não pode ser maior do que a data final!");
        return;
      }
      setState({
        ...state,
        isLoadingSearchScheduling: true,
      });

      const params = {
        datetimestart: `${moment(state.initialDate)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
        datetimeend: `${moment(state.finalDate)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
      };
      const response = await AgentRegisterRegisterSchedulingClass.getSchedules(
        params
      );
      console.log(response);
      if (!response.success) {
        setState({
          ...state,
          isLoadingSearchScheduling: false,
        });
        toast.error(response.errorMessage);
        return;
      }
      setState({
        ...state,
        isLoadingSearchScheduling: false,
        schedules: response.content,
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        isLoadingSearchScheduling: false,
      });
    }
  }

  function dateChange(value: Date, name: string) {
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <Box className={classes.containermain}>
      <form onSubmit={HandlegetSchedules} className={classes.datewrapper}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <MyDatePicker
            label="Data Inicial"
            name="initialDate"
            value={state.initialDate}
            setvalue={(e) => dateChange(e, "initialDate")}
          />
          <MyDatePicker
            label="Data Final"
            name="FinalDate"
            value={state.finalDate}
            setvalue={(e) => dateChange(e, "finalDate")}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={state.isLoadingSearchScheduling}
          >
            Buscar
          </LoadingButton>
        </Stack>
      </form>
      {state.schedules.length > 0 && (
        <AgentRegisterToScheduleSchedules
          intervals={state.schedules[0].intervals}
        />
      )}
    </Box>
  );
};
