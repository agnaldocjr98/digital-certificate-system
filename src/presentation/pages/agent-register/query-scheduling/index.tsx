import { FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { AgentRegisterQueryScheduling as AgentRegisterQuerySchedulingClass } from "@/data/usecases";
import { HeaderContent } from "@/presentation/components/header-content";
import { InnerContent } from "@/presentation/components/inner-content";
import { Validation } from "@/presentation/protocols/validation";
import {
  Box,
  Paper,
  TextField,
  Theme,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AgentRegisterQuerySchedulingTable } from "./table";
import { toast } from "react-toastify";
import { MyDatePicker } from "@/presentation/ui-components/input-datepicker";
import { GetSchedulingsParams } from "@/domain/usecases";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { IniFinDateOfDay } from "@/helpers";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
  datecontainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));

interface AgentRegisterQuerySchedulingProps {
  AgentRegisterQuerySchedulingClass: AgentRegisterQuerySchedulingClass;
  Validation: Validation;
}

export const AgentRegisterQueryScheduling = ({
  AgentRegisterQuerySchedulingClass,
  Validation,
}: AgentRegisterQuerySchedulingProps) => {
  const { id, tipo } = useSelector(getUserData);

  const { iniDate, finDate } = IniFinDateOfDay();
  const [state, setState] = useState({
    schedules: [],
    searchId: "",
    initialDate: iniDate,
    finalDate: finDate,
    isLoading: false,
    reschedule: false,
    waitingFinish: false,
  });

  async function handleGetScheduling(e: FormEvent) {
    e.preventDefault();
    try {
      const iniDate =
        state.initialDate === null
          ? ""
          : state.initialDate.toString() === "InvalidDate"
          ? ""
          : state.initialDate.toString();

      const FinDate =
        state.finalDate === null
          ? ""
          : state.finalDate.toString() === "InvalidDate"
          ? ""
          : state.finalDate.toString();
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
        params.datetimestart = `${moment(iniDate)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
        params.datetimeend = `${moment(FinDate)
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm:ss")}.00Z`;
      }

      console.log(params);
      setState({ ...state, isLoading: true, schedules: [] });
      const response = await AgentRegisterQuerySchedulingClass.getSchedulings(
        params
      );
      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }
      setState({
        ...state,
        isLoading: false,
        schedules: response.content as [],
      });
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
      return;
    }
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
                  id="outlined-basic"
                  label="ID, CPF/CNPJ ou e-mail"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState({ ...state, searchId: e.target.value })
                  }
                />
                <MyDatePicker
                  label="Data Inicial"
                  name="initialDate"
                  value={state.initialDate}
                  setvalue={(e) => setState({ ...state, initialDate: e })}
                />
                <MyDatePicker
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
                  loading={state.isLoading}
                >
                  Buscar
                </LoadingButton>
              </Stack>
            </form>
          </Box>

          {!state.isLoading && state.schedules.length > 0 && (
            <AgentRegisterQuerySchedulingTable data={state.schedules} />
          )}
        </Stack>
      </Paper>
    </InnerContent>
  );
};
