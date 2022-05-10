import { useState } from "react";
import { AgentRegisterRegisterScheduling } from "@/data/usecases";
import { GetClientsContent } from "@/domain/models";
import { Validation } from "@/presentation/protocols/validation";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import {
  changeCurrentClient,
  changeIndex,
} from "@/presentation/redux/slices/registerSchedulingSlice";
import { useDispatch } from "react-redux";

interface AgentRegisterQueryClientProps {
  AgentRegisterRegisterSchedulingClass: AgentRegisterRegisterScheduling;
  Validation: Validation;
}

export const AgentRegisterQueryClient = ({
  AgentRegisterRegisterSchedulingClass,
  Validation,
}: AgentRegisterQueryClientProps) => {
  const [state, setState] = useState({
    isLoading: false,
    clients: [] as GetClientsContent[],
    searchId: "",
  });

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const error = Validation.validate("searchId", state.searchId);
      if (error) {
        toast.info(error);
        return;
      }
      setState({ ...state, isLoading: true });
      const response = await AgentRegisterRegisterSchedulingClass.getClients({
        search: state.searchId,
      });
      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }
      setState({ ...state, clients: response.content });
    } catch (error) {
      toast.error(error.message);
      setState({ ...state, isLoading: false });
    }
  }

  function onChangeClient(email: string) {
    let client = state.clients.find((cli) => cli.email === email);
    client = { ...client, cpfcnpj: client.numero };
    dispatch(changeCurrentClient(client));
    dispatch(changeIndex(1));
  }

  return (
    <>
      {state.clients.length === 0 ? (
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
            <TextField
              size="small"
              id="outlined-idblip"
              label="ID, CPF ou e-mail"
              variant="outlined"
              value={state.searchId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, searchId: e.currentTarget.value })
              }
            />
            <LoadingButton
              variant="contained"
              type="submit"
              loading={state.isLoading}
            >
              Buscar
            </LoadingButton>
          </Stack>
        </form>
      ) : (
        <FormControl sx={{ width: { xs: "100%", sm: "50%" } }}>
          <Stack direction="column" spacing={1.5}>
            <InputLabel id="select">Cliente</InputLabel>
            <Select
              size="small"
              defaultValue=""
              labelId="select"
              id="select"
              label="Cliente"
              autoWidth={false}
              onChange={(e) => onChangeClient(e.target.value)}
            >
              {state.clients.map((client) => {
                return (
                  <MenuItem value={client.email} key={client.id}>
                    <strong>{client.id}</strong> - {client.telefone} -{" "}
                    {client.nome}
                  </MenuItem>
                );
              })}
            </Select>

            <Box>
              <Button
                variant="contained"
                onClick={() =>
                  setState({ ...state, clients: [], searchId: "" })
                }
              >
                Voltar
              </Button>
            </Box>
          </Stack>
        </FormControl>
      )}
    </>
  );
};
