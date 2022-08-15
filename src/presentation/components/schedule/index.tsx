import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Theme, Paper } from "@mui/material";
import { GetSchedulesContent } from "@/domain/models";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { Schedule, Scheduling } from "@/data/entities";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";
import { Loader } from "../loader";
import { LoadingButton } from "@mui/lab";
import { columns } from "./columns";
import { AxiosHttpAdapter } from "@/infra/http";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import { DefaultDateSchedule } from "@/helpers";
import moment from "moment";
import { CreateReschedulingParams } from "@/domain/usecases";
import { HeaderListScheduling } from "@/presentation/pages/create-scheduling/toschedule/list-items";

export interface SelectedSchedule {
  idSchedule: number;
  idInterval: number;
  scheduleName: string;
  initialDateSchedule: string;
  finalDateSchedule: string;
}

interface IdentiteScheduleProps {
  selectedSchedule: (selectedSchedule: SelectedSchedule) => void;
  uid?: string;
  locally: boolean;
}

export function IdentiteSchedule({
  selectedSchedule,
  uid = "",
  locally = false,
}: IdentiteScheduleProps) {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);
  const schedules = new Schedule(axiosHttpClient);

  const Validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "initialDate",
        fieldLabel: "Data Inicial",
      })
        .required()
        .build(),
      ...Builder.field({ fieldName: "finalDate", fieldLabel: "Data Final" })
        .required()
        .build(),
    ]);

  const defaultDates = DefaultDateSchedule();
  const [state, setState] = useState({
    isLoading: false,
    isLoadingReschedule: false,

    initialDate: defaultDates.startDate,
    finalDate: defaultDates.finalDate,
    schedules: [] as GetSchedulesContent[],
    selectedSchedule: {} as SelectedSchedule,
  });

  useEffect(() => {
    if (state.isLoading)
      setState({
        ...state,
        schedules: [],
        selectedSchedule: {} as SelectedSchedule,
      });
  }, [state.isLoading]);

  const { id } = useSelector(getUserData);

  async function getSchedules() {
    try {
      const iniDate =
        state.initialDate === null
          ? ""
          : state.initialDate.toString() === "InvalidDate"
          ? ""
          : state.initialDate.toString();
      const errorDI = Validation().validate("initialDate", iniDate);
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
      const errorDF = Validation().validate("finalDate", FinDate);
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
        isLoading: true,
      });
      const response = await schedules.get({
        datetimestart: `${moment(state.initialDate).format(
          "YYYY-MM-DDTHH:mm"
        )}:00.00Z`,
        datetimeend: `${moment(state.finalDate).format(
          "YYYY-MM-DDTHH:mm"
        )}:00.00Z`,
        locally: locally,
      });
      if (!response.success) {
        setState({
          ...state,
          isLoading: false,
          schedules: [],
          selectedSchedule: {} as SelectedSchedule,
        });
        toast.error(response.errorMessage);
        return;
      }
      setState({
        ...state,
        schedules: response.content,
        selectedSchedule: {} as SelectedSchedule,
        isLoading: false,
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        isLoading: false,
        schedules: [],
        selectedSchedule: {} as SelectedSchedule,
      });
    }
  }

  async function reSchedules() {
    try {
      if (!state.selectedSchedule.idSchedule) {
        toast.info("Selecione uma agenda!");
        return;
      }

      setState({ ...state, isLoadingReschedule: true });
      const params: CreateReschedulingParams = {
        dataagendamento: `${moment(state.selectedSchedule.initialDateSchedule)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
        idagenda: state.selectedSchedule.idSchedule,
        idagtregistro: id,
        uid: uid,
      };

      const response = await scheduling.reschedule(params);
      if (!response.success) {
        setState({ ...state, isLoadingReschedule: false });
        toast.error(response.errorMessage);
        return;
      }
      setState({ ...state, isLoadingReschedule: false });
      toast.success("Reagendamento realizado com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={1.5} direction={{ xs: "column", md: "row" }}>
        <IdentiteDateTimePicker
          label="Data Inicial"
          name="initialDate"
          value={state.initialDate}
          setvalue={(e) => setState({ ...state, initialDate: e })}
        />
        <IdentiteDateTimePicker
          label="Data Final"
          name="FinalDate"
          value={state.finalDate}
          setvalue={(e) => setState({ ...state, finalDate: e })}
        />
        <Button variant="contained" onClick={() => getSchedules()}>
          Buscar
        </Button>
        {!!state.selectedSchedule.scheduleName && (
          <LoadingButton
            variant="contained"
            loading={state.isLoadingReschedule}
            onClick={() => reSchedules()}
          >
            Reagendar
          </LoadingButton>
        )}
      </Stack>

      {state.isLoading ? (
        <Box padding={4}>
          <Loader />
        </Box>
      ) : (
        state.schedules.length > 0 && (
          <Stack
            width="100%"
            height={400}
            spacing={2}
            direction={{ xs: "column", md: "row" }}
          >
            <Box height={400} width={{ sm: "100%", md: "380px" }}>
              <DataGrid
                sx={{ width: "100%" }}
                rowHeight={45}
                autoHeight
                onRowClick={(e) => {
                  selectedSchedule({
                    initialDateSchedule: e.row.datetimestart,
                    finalDateSchedule: e.row.datetimeend,
                    scheduleName: e.row.schedule,
                    idInterval: e.row.id,
                    idSchedule: e.row.idschedule,
                  });
                  setState({
                    ...state,
                    selectedSchedule: {
                      initialDateSchedule: e.row.datetimestart,
                      finalDateSchedule: e.row.datetimeend,
                      scheduleName: e.row.schedule,
                      idInterval: e.row.id,
                      idSchedule: e.row.idschedule,
                    },
                  });
                }}
                rows={state.schedules[0].intervals}
                columns={columns}
                hideFooterSelectedRowCount
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
            {!!state.selectedSchedule.scheduleName && (
              <HeaderListScheduling
                client="Reagendamento"
                schedule={state.selectedSchedule.scheduleName}
                dates={[
                  moment(state.selectedSchedule.initialDateSchedule)
                    .add(-3, "h")
                    .format("DD/MM/YYYY"),
                  moment(state.selectedSchedule.finalDateSchedule)
                    .add(-3, "h")
                    .format("DD/MM/YYYY"),
                ]}
                hours={[
                  moment(state.selectedSchedule.initialDateSchedule)
                    .add(-3, "h")
                    .format("HH:mm:ss"),
                  moment(state.selectedSchedule.finalDateSchedule)
                    .add(-3, "h")
                    .format("HH:mm:ss"),
                ]}
              />
            )}
          </Stack>
        )
      )}
    </Stack>
  );
}
