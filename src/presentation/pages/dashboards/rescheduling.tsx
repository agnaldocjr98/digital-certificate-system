import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

export const DashboardRescheduling = ({
  dashboard,
}: DashboardScheduleProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="reschedule table">
        <TableHead>
          <TableRow>
            <DashboardTableHeader
              width="20%"
              align="center"
            ></DashboardTableHeader>
            <DashboardTableHeader colSpan={1} align="center">
              Agendados
            </DashboardTableHeader>
            <DashboardTableHeader colSpan={5} align="center">
              Agendados por agentes
            </DashboardTableHeader>
            <DashboardTableHeader
              colSpan={5}
              align="center"
            ></DashboardTableHeader>
          </TableRow>
          <TableRow>
            <DashboardTableHeader width="20%" align="center">
              Reagendamento
            </DashboardTableHeader>
            {dashboard.reschedule.fromto.map((fromto) => (
              <DashboardTableHeader align="center">
                {moment(fromto).format("DD/MM/YYYY")}
              </DashboardTableHeader>
            ))}
            <DashboardTableHeader align="center">A Reag.</DashboardTableHeader>
            <DashboardTableHeader align="center">Canc.</DashboardTableHeader>
            <DashboardTableHeader align="center">Reag.</DashboardTableHeader>
            <DashboardTableHeader align="center">Pres.</DashboardTableHeader>
            <DashboardTableHeader align="center">Ñ reag.</DashboardTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard.reschedule.data.map((dt, idx) => {
            return (
              <DashboardTableRow
                idx={idx}
                last={idx === dashboard.reschedule.data.length - 1}
              >
                <DashboardTableCell
                  align="left"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                  sx={{ fontWeight: "bold" }}
                >
                  {dt.agtreg}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day0}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day1}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day2}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day3}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day4}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.day5}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.toreschedule}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.canceled}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.rescheduled}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.locally}
                </DashboardTableCell>
                <DashboardTableCell
                  align="center"
                  whiteText={idx === dashboard.reschedule.data.length - 1}
                >
                  {dt.notrescheduled}
                </DashboardTableCell>
              </DashboardTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
