import { useState } from "react";
import { Client } from "@/data/entities";
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
} from "@/presentation/redux/slices/register-scheduling";
import { useDispatch } from "react-redux";

interface ListClientsProps {
  client: Client;
  validation: Validation;
}

export const ListClients = ({ client, validation }: ListClientsProps) => {
  const [state, setState] = useState({
    isLoading: false,
    clients: [] as GetClientsContent[],
    searchId: "",
  });

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const error = validation.validate("searchId", state.searchId);
      if (error) {
        toast.info(error);
        return;
      }
      setState({ ...state, isLoading: true });
      const response = await client.get({
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
          <Stack
            direction={{ xs: "column", lg: "row" }}
            sx={{ width: { xs: "50%", md: "50%" } }}
            spacing={1.5}
          >
            <TextField
              sx={{ minWidth: "200px" }}
              size="small"
              id="outlined-idblip"
              label="ID, CPF ou e-mail"
              variant="outlined"
              value={state.searchId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, searchId: e.currentTarget.value })
              }
            />
            <Box>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={state.isLoading}
              >
                Buscar
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      ) : (
        <FormControl sx={{ width: { xs: "100%", sm: "300px" } }}>
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
