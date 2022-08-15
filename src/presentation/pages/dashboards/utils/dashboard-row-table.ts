import { TableRow, styled } from "@mui/material";

interface TableRowProps {
  idx: number;
  last: boolean;
  lastbutone?: boolean;
}

export const DashboardTableRow = styled(TableRow)<TableRowProps>(
  ({ idx, last, lastbutone = false, theme }) => ({
    fontSize: "11px",
    backgroundColor: last
      ? theme.colors.error.light
      : lastbutone
      ? theme.colors.success.dark
      : idx % 2 === 0
      ? theme.colors.info.lighter
      : "#fff",
    color: "#FFF",
  })
);
