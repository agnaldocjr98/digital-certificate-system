import { GridColDef } from "@mui/x-data-grid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "idschedule", headerName: "Schedule ID", hide: true },
  {
    field: "icon",
    headerName: "",
    width: 50,
    renderCell: () => <DateRangeIcon />,
  },
  {
    field: "datetimestart",
    headerName: "Data Inicial",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) =>
      moment(params.value).add(-3, "h").format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "datetimeend",
    headerName: "Data Final",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) =>
      moment(params.value).add(-3, "h").format("DD/MM/YYYY HH:mm:ss"),
  },
];
