import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { HeaderContent } from "@/presentation/components/header-content";
import { Box, Divider, Paper } from "@mui/material";
import { InnerContent } from "@/presentation/components/inner-content";
import { Wizard } from "./wizard";
import { AgentRegisterRegisterScheduling } from "@/data/usecases";
import { Validation } from "@/presentation/protocols/validation";
import { AgentRegisterDataClient } from "./data-client";
import { AgentRegisterToSchedule } from "./toschedule";
import { useRegisterScheduling } from "@/presentation/redux/slices/registerSchedulingSlice";
import { AgentRegisterQueryClient } from "./query-client";

interface AgentRegisterSchedulingProps {
  AgentRegisterRegisterSchedulingClass: AgentRegisterRegisterScheduling;
  Validation: Validation;
}

export const AgentRegisterScheduling = memo(function AgentRegisterScheduling({
  AgentRegisterRegisterSchedulingClass,
  Validation,
}: AgentRegisterSchedulingProps) {
  const { index } = useSelector(useRegisterScheduling);

  return (
    <InnerContent>
      <HeaderContent
        text="Cadastrar/Agendar atendimento"
        subtext="Processo para agendamento de atendimentos referente a emissão dos certificados digitais."
      />
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Wizard index={index} />
        <Divider sx={{ mb: 0 }} />
        <Box
          sx={{
            flex: 1,
            margin: (theme) => theme.spacing(2.5),
          }}
        >
          {index === 0 && (
            <AgentRegisterQueryClient
              AgentRegisterRegisterSchedulingClass={
                AgentRegisterRegisterSchedulingClass
              }
              Validation={Validation}
            />
          )}
          {index === 1 && <AgentRegisterDataClient />}
          {index === 2 && (
            <AgentRegisterToSchedule
              AgentRegisterRegisterSchedulingClass={
                AgentRegisterRegisterSchedulingClass
              }
              Validation={Validation}
            />
          )}
        </Box>
      </Paper>
    </InnerContent>
  );
});
