import { FormEvent, useState } from "react";
import { Paper, Stack } from "@mui/material";
import { DashboardSchedule } from "./schedule";
import { DashboardRescheduling } from "./rescheduling";
import { DashboardGeral } from "./geral";
import { LoadingButton } from "@mui/lab";
import { IdentiteDatePicker } from "@/presentation/ui-components";
import { Dashboard } from "@/data/entities";
import moment from "moment";
import { toast } from "react-toastify";
import { GetDashboardsContent } from "@/domain/models";

interface DashboardsProps {
  dashboard: Dashboard;
}

export const Dashboards = ({ dashboard }: DashboardsProps) => {
  const [state, setState] = useState({
    date: moment().toDate(),
    isLoading: false,
    dashboards: {} as GetDashboardsContent,
  });

  async function handleGetDashboards(e: FormEvent) {
    e.preventDefault();
    try {
      if (!state.date) {
        toast.error("Data inválida!");
        return;
      }
      setState({ ...state, isLoading: true });
      const response = await dashboard.get({
        date: moment(state.date).format("YYYY-MM-DD").toString(),
      });
      setState({ ...state, dashboards: response.content, isLoading: false });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Stack padding={4} spacing={4}>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(2) }}>
        <form onSubmit={handleGetDashboards}>
          <Stack direction="row" spacing={2}>
            <IdentiteDatePicker
              label="Data"
              name="dtDate"
              value={state.date}
              setvalue={(e) => setState({ ...state, date: e })}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              loading={state.isLoading}
            >
              Consultar
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
      {"schedule" in state.dashboards && !state.isLoading && (
        <>
          <DashboardSchedule
            dashboard={state.dashboards}
            currDate={moment(state.date).format("DD/MM/YYYY").toString()}
          />
          <DashboardRescheduling dashboard={state.dashboards} />
          <DashboardGeral dashboard={state.dashboards} />
        </>
      )}
    </Stack>
  );
};
