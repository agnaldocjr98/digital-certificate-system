import { TableCell, styled } from "@mui/material";

export const DashboardTableHeader = styled(TableCell)(
  ({ theme }) => `
    background-color: ${theme.palette.primary.main};
    color: ${theme.colors.alpha.white[100]};
    font-size: 12px;
    `
  // border-color: #fff;
  // border-width: 0.5px;
);
