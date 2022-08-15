import { FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Scheduling } from "@/data/entities";
import { HeaderContent } from "@/presentation/components/header-content";
import { InnerContent } from "@/presentation/components/inner-content";
import {
  Box,
  Paper,
  TextField,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { QuerySchedulingTable } from "./table";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { GetSchedulingsParams } from "@/domain/usecases";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import { Validation } from "@/presentation/protocols/validation";
import {
  FormatTimeZoneIdentite,
  IniFinDateOfDay,
  ValidDateString,
} from "@/helpers";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

interface ListSchedulingsProps {
  scheduling: Scheduling;
  validation: Validation;
}

export const ListSchedulings = ({
  scheduling,
  validation,
}: ListSchedulingsProps) => {
  const { id, tipo } = useSelector(getUserData);

  const { iniDate, finDate } = IniFinDateOfDay();
  const [state, setState] = useState({
    searchId: "",
    initialDate: iniDate,
    finalDate: finDate,
    reschedule: false,
    waitingFinish: false,
  });

  const { refetch, isFetching, data } = useQuery(
    "schedulings",
    async () => {
      try {
        const iniDate = ValidDateString(state.initialDate);
        const FinDate = ValidDateString(state.finalDate);

        if (state.initialDate > state.finalDate) {
          toast.info("A Data inicial não pode ser maior do que a data final!");
          return;
        }
        const params: GetSchedulingsParams = {
          iduser: id,
          reschedule: state.reschedule,
          waitingfinish: state.waitingFinish,
        };
        if (state.searchId) {
          params.search = state.searchId;
        }
        if (iniDate) {
          params.datetimestart = FormatTimeZoneIdentite(iniDate);
          params.datetimeend = FormatTimeZoneIdentite(FinDate);
        }
        const response = await scheduling.get(params);

        if (!response.success) {
          toast.error(response.errorMessage);
          return;
        }
        return response.content;
      } catch (error) {
        toast.error(error.message);
        return;
      }
    },
    {
      staleTime: 1000 * 60 * 5, //5 minutos,
      enabled: false,
    }
  );

  async function handleGetScheduling(e: FormEvent) {
    e.preventDefault();
    refetch();
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Consultar agendamento"
        subtext="Atendimentos e operações principais relacionadas a emissão dos certificados digitais."
      />

      <Paper elevation={0}>
        <Stack>
          <Box p={2}>
            <form onSubmit={handleGetScheduling}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  value={state.searchId}
                  size="small"
                  id="idcpfemail"
                  label="ID, CPF/CNPJ ou e-mail"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState({ ...state, searchId: e.target.value })
                  }
                />
                <IdentiteDateTimePicker
                  label="Data Inicial"
                  name="initialDate"
                  value={state.initialDate}
                  setvalue={(e) => setState({ ...state, initialDate: e })}
                />
                <IdentiteDateTimePicker
                  label="Data Final"
                  name="FinalDate"
                  value={state.finalDate}
                  setvalue={(e) => setState({ ...state, finalDate: e })}
                />
                {tipo !== "AV" && (
                  <>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={state.reschedule}
                            onChange={(e) =>
                              setState({
                                ...state,
                                reschedule: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Reagendamentos"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={state.waitingFinish}
                            onChange={(e) =>
                              setState({
                                ...state,
                                waitingFinish: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Pendente de finalização"
                      />
                    </FormGroup>
                  </>
                )}
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isFetching}
                >
                  Buscar
                </LoadingButton>
              </Stack>
            </form>
          </Box>

          {!isFetching && data?.length > 0 && (
            <QuerySchedulingTable data={data} />
          )}
        </Stack>
      </Paper>
    </InnerContent>
  );
};
