import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from "@mui/material";
import { GetDashboardsContent } from "@/domain/models";
import {
  DashboardTableRow,
  DashboardTableCell,
  DashboardTableHeader,
} from "./utils";
import moment from "moment";

interface DashboardScheduleProps {
  dashboard: GetDashboardsContent;
  currDate: string;
}

export const DashboardSchedule = ({
  dashboard,
  currDate,
}: DashboardScheduleProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="schedule table">
        <TableHead>
          <TableRow>
            <DashboardTableHeader
              width="20%"
              align="center"
            ></DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={6}>
              Data
            </DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={4}>
              Vídeo
            </DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={1}>
              -
            </DashboardTableHeader>
          </TableRow>
          <TableRow>
            <DashboardTableHeader
              width="20%"
              align="center"
            ></DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={1}>
              Cadastro
            </DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={5}>
              Agenda
            </DashboardTableHeader>
            <DashboardTableHeader
              align="center"
              colSpan={1}
            ></DashboardTableHeader>
            <DashboardTableHeader
              align="center"
              colSpan={3}
            ></DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={1}>
              Qtd.
            </DashboardTableHeader>
          </TableRow>
          <TableRow>
            <DashboardTableHeader width="20%" align="center">
              <span style={{ display: "absolute", marginBottom: "20px" }}>
                Agente de registro
              </span>
            </DashboardTableHeader>
            {dashboard.schedule.fromto.map((fromto) => (
              <DashboardTableHeader align="center">
                {moment(fromto).format("DD/MM/YYYY")}
              </DashboardTableHeader>
            ))}
            <DashboardTableHeader align="center">
              {currDate}
            </DashboardTableHeader>
            <DashboardTableHeader align="center">Sim</DashboardTableHeader>
            <DashboardTableHeader align="center">Não</DashboardTableHeader>
            <DashboardTableHeader align="center">Canc.</DashboardTableHeader>
            <DashboardTableHeader align="center">Clientes</DashboardTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard.schedule.data.map((dt, idx) => {
            return (
              <DashboardTableRow
                idx={idx}
                last={idx === dashboard.schedule.data.length - 1}
                lastbutone={idx === dashboard.schedule.data.length - 2}
              >
                <DashboardTableCell
                  align="left"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                  sx={{ fontWeight: "bold" }}
                >
                  {dt.agtreg}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day0}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day1}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day2}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day3}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day4}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                >
                  {dt.day5}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                  sx={{
                    backgroundColor:
                      idx === dashboard.schedule.data.length - 1
                        ? (theme) => theme.palette.info.dark
                        : null,
                  }}
                >
                  {dt.totalvideo}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                ></DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                ></DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={
                    idx === dashboard.schedule.data.length - 1 ||
                    idx === dashboard.schedule.data.length - 2
                  }
                ></DashboardTableCell>
                {idx === dashboard.schedule.data.length - 1 ? (
                  <DashboardTableCell align="center" whiteText={true}>
                    {dashboard.schedule.quantitycustomers}
                  </DashboardTableCell>
                ) : (
                  <DashboardTableCell
                    whiteText={false}
                    align="center"
                    sx={{
                      backgroundColor: (theme) => theme.colors.alpha.black[100],
                      border: "none",
                    }}
                  ></DashboardTableCell>
                )}
              </DashboardTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
