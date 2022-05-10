import React, { FormEvent, useState } from "react";
import { Box, Button, Paper, Tab, Theme } from "@mui/material";
import { GetSchedulesContent } from "@/domain/models";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { MyDatePicker } from "@/presentation/ui-components/input-datepicker";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";
import { RegisterReschedulingParams } from "@/domain/usecases";
import { Loader } from "../../ui-components/loader";
import { TabContext, TabList, TabPanel, LoadingButton } from "@mui/lab";
import { columns } from "./columns";
import moment from "moment";
import { AxiosHttpAdapter } from "@/infra/http";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { DefaultDateSchedule } from "@/helpers";

const useStyles = makeStyles((theme: Theme) => ({
  containerMain: {
    height: "100%",
    paddingTop: theme.spacing(1),
  },
  containerDates: {
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
  strong: {
    fontSize: "17px",
  },
}));

export interface SelectedSchedule {
  idSchedule: number;
  idInterval: number;
  scheduleName: string;
  initialDateSchedule: string;
  finalDateSchedule: string;
}

interface ScheduleProps {
  selectedSchedule(selectedSchedule: SelectedSchedule): void;
  callcack?: () => any;
  uid?: string;
}

export const CertificateSystemSchedule: React.FC<ScheduleProps> = ({
  selectedSchedule,
  callcack,
  uid = "",
}) => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const AgentRegisterQuerySchedulingInstance = new AgentRegisterQueryScheduling(
    axiosHttpClient
  );
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
    activeTab: "0",
    initialDate: defaultDates.startDate,
    finalDate: defaultDates.finalDate,
    schedules: [] as GetSchedulesContent[],
    selectedSchedule: {} as SelectedSchedule,
  });
  const { id } = useSelector(getUserData);
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setState({ ...state, activeTab: newValue });
  };

  async function getSchedules(e: FormEvent) {
    try {
      e.preventDefault();
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
      const response = await AgentRegisterQuerySchedulingInstance.getSchedules({
        datetimestart: `${moment(state.initialDate).format(
          "YYYY-MM-DDTHH:mm"
        )}:00.00Z`,
        datetimeend: `${moment(state.finalDate).format(
          "YYYY-MM-DDTHH:mm"
        )}:00.00Z`,
      });
      if (!response.success) {
        setState({
          ...state,
          isLoading: false,
        });
        toast.error(response.errorMessage);
        return;
      }
      setState({
        ...state,
        schedules: response.content,
        isLoading: false,
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        isLoading: false,
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
      const params: RegisterReschedulingParams = {
        dataagendamento: `${moment(state.selectedSchedule.initialDateSchedule)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
        idagenda: state.selectedSchedule.idSchedule,
        idagtregistro: id,
        uid: uid,
      };

      const response =
        await AgentRegisterQuerySchedulingInstance.RegisterRescheduling(params);
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
    <Box className={classes.containerMain}>
      <form onSubmit={getSchedules} className={classes.containerDates}>
        <MyDatePicker
          label="Data Inicial"
          name="initialDate"
          value={state.initialDate}
          setvalue={(e) => setState({ ...state, initialDate: e })}
        />
        <MyDatePicker
          label="Data Final"
          name="FinalDate"
          value={state.finalDate}
          setvalue={(e) => setState({ ...state, finalDate: e })}
        />
        <Button variant="contained" type="submit">
          Buscar
        </Button>
      </form>

      {state.isLoading ? (
        <Box className={classes.containerLoader}>
          <Loader />
        </Box>
      ) : (
        state.schedules.length > 0 && (
          <Box sx={{ width: "100%", typography: "body1" }}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "primary.main",
                color: "white",
                padding: (theme) => theme.spacing(2),
              }}
            >
              {!state.selectedSchedule.scheduleName ? (
                <span>Nenhum agenda selecionada</span>
              ) : (
                <span>
                  AGENDA -{" "}
                  <strong className={classes.strong}>
                    {state.selectedSchedule.scheduleName}
                  </strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    {moment(state.selectedSchedule.initialDateSchedule).format(
                      "DD/MM/YYYY"
                    )}{" "}
                    <strong className={classes.strong}>
                      {moment(state.selectedSchedule.initialDateSchedule)
                        .add(-3, "h")
                        .format("HH:mm:ss")}
                    </strong>
                    {" a "}
                    {moment(state.selectedSchedule.finalDateSchedule).format(
                      "DD/MM/YYYY"
                    )}{" "}
                    <strong className={classes.strong}>
                      {moment(state.selectedSchedule.finalDateSchedule)
                        .add(-3, "h")
                        .format("HH:mm:ss")}
                    </strong>
                  </span>
                </span>
              )}
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "6px",
                }}
              >
                <LoadingButton
                  loading={state.isLoadingReschedule}
                  variant="outlined"
                  onClick={reSchedules}
                >
                  Reagendar
                </LoadingButton>
              </Box>
            </Paper>
            <TabContext value={state.activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "Boxider" }}>
                <TabList onChange={handleChange}>
                  {state.schedules.map((schedule, index) => {
                    return (
                      <Tab
                        key={index}
                        label={schedule.schedule}
                        value={index.toString()}
                      />
                    );
                  })}
                </TabList>
              </Box>
              {state.schedules.map((schedule, index) => {
                return (
                  <TabPanel key={index} value={index.toString()}>
                    <DataGrid
                      autoHeight
                      onRowClick={(e) => {
                        console.log(e);
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
                      rows={schedule.intervals}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      hideFooterSelectedRowCount
                    />
                  </TabPanel>
                );
              })}
            </TabContext>
          </Box>
        )
      )}
    </Box>
  );
};
