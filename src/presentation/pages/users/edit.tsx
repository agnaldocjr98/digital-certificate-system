import { useState } from "react";
import { InnerContent } from "@/presentation/components/inner-content";
import { HeaderContent } from "@/presentation/components/header-content";
import { User } from "@/data/entities";
import { useLocation, useNavigate } from "react-router-dom";
import { GetUsersContent } from "@/domain/models";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import Text from "@/presentation/components/text";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";

export interface EditUserProps {
  user: User;
  validation: Validation;
}

interface State {
  user: {
    id: number;
    nome: string;
    email: string;
    tipo: string;
  };
}

export const EditUser = ({ user, validation }: EditUserProps) => {
  const state: State = useLocation().state as State;
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const id = state.user.id;
  const [currUser, setCurrUser] = useState({
    nome: state.user.nome,
    email: state.user.email,
    tipo: state.user.tipo,
  } as GetUsersContent);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEditUser() {
    try {
      let value = "";
      value = validation.validate("nome", currUser.nome);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("email", currUser.email);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("tipo", currUser.tipo);
      if (value) {
        toast.error(value);
        return;
      }
      setIsLoading(true);
      const response = await user.update(id, currUser);
      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      toast.info("Usuário alterado com sucesso!");
      const users = queryClient.getQueryData<GetUsersContent[]>("users");
      if (users) {
        const newUsers = users.map((user) => {
          return user.id === id ? { ...user, ...currUser } : user;
        });
        queryClient.setQueryData("users", newUsers);
        navigation("/users", {
          state: { user: currUser },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  function handleBackToList() {
    navigation("/users", {
      state: { user: currUser },
    });
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Edição de usuário"
        subtext="Edição de usuários responsáveis por executar tarefas no sistema (Agente de registro, agente de vídeo, Parceiro e gestor)"
      />
      <Text color="error">Os campos com * são obrigatórios.</Text>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(4) }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              value={currUser.nome}
              onChange={(e) =>
                setCurrUser({ ...currUser, nome: e.target.value })
              }
              size="small"
              id="name"
              label="* Nome"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              value={currUser.email}
              onChange={(e) =>
                setCurrUser({ ...currUser, email: e.target.value })
              }
              size="small"
              id="email"
              label="* E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="type">* Tipo</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={currUser.tipo}
                label="* Tipo"
                onChange={(e) =>
                  setCurrUser({ ...currUser, tipo: e.target.value })
                }
              >
                <MenuItem value="AR">Agente de registro</MenuItem>
                <MenuItem value="AV">Agente de vídeo</MenuItem>
                <MenuItem value="GE">Gestor</MenuItem>
                <MenuItem value="PA">Parceiro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          gap={2}
          display="flex"
          justifyContent="flex-end"
          mt={2}
        >
          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={handleEditUser}
          >
            Gravar
          </LoadingButton>
          <LoadingButton variant="contained" onClick={handleBackToList}>
            Voltar
          </LoadingButton>
        </Stack>
      </Paper>
    </InnerContent>
  );
};
