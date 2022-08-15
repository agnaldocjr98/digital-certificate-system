import React, { useState } from "react";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { Box, Theme, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import { GetSchedulesContent } from "@/domain/models";
import { Scheduling, Schedule } from "@/data/entities";
import { Validation } from "@/presentation/protocols/validation";
import { DefaultDateSchedule } from "@/helpers";
import { toast } from "react-toastify";
import AgentRegisterToScheduleSchedules from "./create-scheduling";
import moment from "moment";
import CreateScheduling from "./create-scheduling";

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

interface ToScheduleProps {
  schedule: Schedule;
  scheduling: Scheduling;
  validation: Validation;
}

export const ToSchedule = ({
  schedule,
  scheduling,
  validation,
}: ToScheduleProps) => {
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
      const errorDI = validation.validate("initialDate", iniDate);
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
      const errorDF = validation.validate("finalDate", FinDate);
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
        locally: false,
      };
      const response = await schedule.get(params);
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
    <Box height="100%">
      <form onSubmit={HandlegetSchedules} className={classes.datewrapper}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <IdentiteDateTimePicker
            label="Data Inicial"
            name="initialDate"
            value={state.initialDate}
            setvalue={(e) => dateChange(e, "initialDate")}
          />
          <IdentiteDateTimePicker
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
        <CreateScheduling
          intervals={state.schedules[0].intervals}
          scheduling={scheduling}
        />
      )}
    </Box>
  );
};
