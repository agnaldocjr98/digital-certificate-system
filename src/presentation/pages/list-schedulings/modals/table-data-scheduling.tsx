import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  DashboardTableHeader,
  DashboardTableRow,
  DashboardTableCell,
} from "@/presentation/pages/dashboards/utils";
import moment from "moment";

interface TableDataClientProps {
  schedulingdate: string;
  name: string;
  protocol: string;
  typecertificate: string;
}

export const TableDataClient = ({
  schedulingdate,
  name,
  protocol,
  typecertificate,
}: TableDataClientProps) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="table-dados-identite"
      >
        <TableHead>
          <TableRow>
            <DashboardTableHeader align="center">
              Data de agendamento
            </DashboardTableHeader>
            <DashboardTableHeader align="center">Nome</DashboardTableHeader>
            <DashboardTableHeader align="center">
              Protocolo
            </DashboardTableHeader>
            <DashboardTableHeader align="center">
              Tipo de certificado
            </DashboardTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <DashboardTableRow idx={0} last={false}>
            <DashboardTableCell
              align="center"
              whiteText={false}
              fontSize="12px"
            >
              {moment(schedulingdate).format("DD/MM/YYYY HH:mm:ss")}
            </DashboardTableCell>
            <DashboardTableCell
              align="center"
              whiteText={false}
              fontSize="12px"
            >
              {name}
            </DashboardTableCell>
            <DashboardTableCell
              align="center"
              whiteText={false}
              fontSize="12px"
            >
              {protocol}
            </DashboardTableCell>
            <DashboardTableCell
              align="center"
              whiteText={false}
              fontSize="12px"
            >
              {typecertificate}
            </DashboardTableCell>
          </DashboardTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
