import { useSelector } from "react-redux";
import { HeaderContent } from "@/presentation/components/header-content";
import { Box, Divider, Paper } from "@mui/material";
import { InnerContent } from "@/presentation/components/inner-content";
import { Wizard } from "./wizard";
import { Scheduling, Schedule, Client } from "@/data/entities";
import { Validation } from "@/presentation/protocols/validation";
import { ToSchedule } from "./toschedule";
import { useRegisterScheduling } from "@/presentation/redux/slices/register-scheduling";
import { DataClient } from "./data-client";
import { ListClients } from "./list-clients";

interface CreateSchedulingProps {
  scheduling: Scheduling;
  schedule: Schedule;
  client: Client;
  validation: Validation;
}

export const CreateScheduling = ({
  scheduling,
  schedule,
  client,
  validation,
}: CreateSchedulingProps) => {
  const { index } = useSelector(useRegisterScheduling);

  return (
    <InnerContent>
      <HeaderContent
        text="Cadastrar atendimento"
        subtext="Processo para agendamento de atendimentos referente a emissão dos certificados digitais"
      />
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Box flex={1} margin={2.5}>
          {index === 0 && (
            <ListClients client={client} validation={validation} />
          )}
          {index === 1 && <DataClient />}
          {index === 2 && (
            <ToSchedule
              schedule={schedule}
              scheduling={scheduling}
              validation={validation}
            />
          )}
        </Box>
      </Paper>
    </InnerContent>
  );
};
