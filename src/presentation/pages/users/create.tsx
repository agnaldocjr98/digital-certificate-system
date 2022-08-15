import { useState } from "react";
import { InnerContent } from "@/presentation/components/inner-content";
import { HeaderContent } from "@/presentation/components/header-content";
import { User } from "@/data/entities";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import Text from "@/presentation/components/text";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface CreateUserProps {
  user: User;
  validation: Validation;
}

export const CreateUser = ({ user, validation }: CreateUserProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [state, setState] = useState({
    nome: "",
    email: "",
    tipo: "",
    senha: "",
  } as GetUsersContent);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateUser() {
    try {
      let value = "";
      value = validation.validate("nome", state.nome);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("email", state.email);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("tipo", state.tipo);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("senha", state.senha);
      if (value) {
        toast.error(value);
        return;
      }
      setIsLoading(true);
      const response = await user.create(state);
      setIsLoading(false);
      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }
      const id = response.content.id;
      toast.success("Usuário criado com sucesso!");
      const users = queryClient.getQueryData<GetUsersContent[]>("users");
      if (users) {
        const newUsers = [...users, { ...state, id: id }];
        queryClient.setQueryData("users", newUsers);
        navigation("/users", {
          state: { user: state },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  function handleBackToList() {
    navigation("/users", {
      state: { user: state },
    });
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Criação de usuário"
        subtext="Criação de usuários responsáveis por executar tarefas no sistema (Agente de registro, agente de vídeo, Parceiro e gestor)"
      />
      <Text color="error">Os campos com * são obrigatórios.</Text>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(4) }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              value={state.nome}
              onChange={(e) => setState({ ...state, nome: e.target.value })}
              size="small"
              id="name"
              label="* Nome"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              size="small"
              id="email"
              label="* E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              value={state.senha}
              onChange={(e) => setState({ ...state, senha: e.target.value })}
              size="small"
              id="password"
              label="* Senha"
              variant="outlined"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    edge="end"
                  >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="type">* Tipo</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={state.tipo}
                label="* Tipo"
                onChange={(e) => setState({ ...state, tipo: e.target.value })}
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
            onClick={handleCreateUser}
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
