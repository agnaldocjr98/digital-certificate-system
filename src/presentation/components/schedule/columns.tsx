import { GridColDef } from "@mui/x-data-grid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import { HeaderDataGrid } from "@/presentation/ui-components";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "idschedule", headerName: "Schedule ID", hide: true },
  {
    field: "icon",
    headerName: "",
    width: 50,
    renderHeader: (params) => (
      <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
    ),
    renderCell: () => <DateRangeIcon />,
  },
  {
    field: "datetimestart",
    headerName: "Data Inicial",
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
    ),
    renderCell: (params) =>
      moment(params.value).add(-3, "h").format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "datetimeend",
    headerName: "Data Final",
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
    ),
    renderCell: (params) =>
      moment(params.value).add(-3, "h").format("DD/MM/YYYY HH:mm:ss"),
  },
];
