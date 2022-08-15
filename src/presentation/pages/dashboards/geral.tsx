import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import moment from "moment";
import { GetDashboardsContent } from "@/domain/models";
import {
  DashboardTableRow,
  DashboardTableCell,
  DashboardTableHeader,
} from "./utils";

interface DashboardScheduleProps {
  dashboard: GetDashboardsContent;
}

export const DashboardGeral = ({ dashboard }: DashboardScheduleProps) => {
  const before = dashboard.geral.fromto.slice(0, 5);
  const after = dashboard.geral.fromto.slice(6, dashboard.geral.fromto.length);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="reschedule table">
        <TableHead>
          <TableRow>
            <DashboardTableHeader
              width="20%"
              align="center"
            ></DashboardTableHeader>
            <DashboardTableHeader align="center" colSpan={10}>
              Agenda geral
            </DashboardTableHeader>
          </TableRow>
          <TableRow>
            <DashboardTableHeader width="20%" align="center">
              Agente de registro
            </DashboardTableHeader>
            {before.map((befr) => (
              <DashboardTableHeader align="center">
                {moment(befr).format("DD/MM/YYYY")}
              </DashboardTableHeader>
            ))}
            <DashboardTableHeader
              align="center"
              sx={{ backgroundColor: (theme) => theme.palette.success.dark }}
            >
              Dep. Hoje
            </DashboardTableHeader>
            {after.map((aftr) => (
              <DashboardTableHeader align="center">
                {moment(aftr).format("DD/MM/YYYY")}
              </DashboardTableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard.geral.data.map((dt, idx) => {
            return (
              <DashboardTableRow
                idx={idx}
                last={idx === dashboard.geral.data.length - 1}
              >
                <DashboardTableCell
                  align="left"
                  whiteText={idx === dashboard.geral.data.length - 1}
                  sx={{ fontWeight: "bold" }}
                >
                  {dt.agtreg}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt["day-5"]}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt["day-4"]}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt["day-3"]}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt["day-2"]}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt["day-1"]}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                  sx={{
                    backgroundColor: (theme) => theme.palette.success.light,
                  }}
                >
                  {dt.aftertoday}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt.day0}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt.day1}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt.day2}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.geral.data.length - 1}
                >
                  {dt.day3}
                </DashboardTableCell>
              </DashboardTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
