import React from "react";
import { Paper, Stack } from "@mui/material";

interface PaperStepProps {
  done: boolean;
  children: React.ReactNode;
}
export const PaperStep = ({ children, done }: PaperStepProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) => done && theme.colors.success.lighter,
        pointerEvents: done && "none",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ sx: "flex-start", md: "center" }}
        justifyContent={{ sx: "center", md: "flex-start" }}
      >
        {children}
      </Stack>
    </Paper>
  );
};
