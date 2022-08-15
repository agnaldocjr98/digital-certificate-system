import { TableCell, styled } from "@mui/material";

interface TableCellProps {
  whiteText: boolean;
  fontSize?: string;
}

export const DashboardTableCell = styled(TableCell)<TableCellProps>(
  ({ whiteText, fontSize = "11px" }) => ({
    fontSize: fontSize,
    color: whiteText && "#fff",
    fontWeight: whiteText && "bold",
  })
);
