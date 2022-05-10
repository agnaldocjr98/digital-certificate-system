import React, { useState } from "react";
import { Criptography } from "@/helpers/crypt-decript";
import { useNavigate } from "react-router-dom";
import { Box, Grid, styled, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Authentication } from "@/data/usecases/authentication";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "@/presentation/redux/slices/userSlice";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const LoginContainer = styled(Grid)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    max-width: 400px;
    width: 400px;
    padding: ${theme.spacing(5)}
`
);

interface StateProps {
  email: string;
  senha: string;
  isLoading: boolean;
}

interface LoginProps {
  authentication: Authentication;
  validation: Validation;
}

export const Login: React.FC<LoginProps> = ({ authentication, validation }) => {
  const [state, setState] = useState<StateProps>({
    email: "",
    senha: "",
    isLoading: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onHandleLogin(e: React.FormEvent) {
    try {
      e.preventDefault();
      let error = validation.validate("email", state.email);
      if (error) {
        toast.info(error);
        return;
      }
      error = validation.validate("senha", state.senha);
      if (error) {
        toast.info(error);
        return;
      }
      setState({ ...state, isLoading: true });
      const response = await authentication.auth({
        email: state.email,
        senha: state.senha,
      });
      setState({ ...state, isLoading: false });
      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }

      dispatch(setUserData(response.content));
      localStorage.setItem(
        "identite@isAuthenticated",
        Criptography("authenticated")
      );
      navigate("/home", { state: { page: "identite#home" } });
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
    }
  }

  return (
    <MainContainer>
      <LoginContainer as="form" onSubmit={onHandleLogin}>
        <TextField
          id="outlined-basic-email"
          label="E-mail"
          variant="outlined"
          size="small"
          value={state.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, email: e.currentTarget.value })
          }
        />
        <TextField
          id="outlined-basic=senha"
          label="Senha"
          variant="outlined"
          size="small"
          type="password"
          value={state.senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, senha: e.currentTarget.value })
          }
        />
        <LoadingButton
          loading={state.isLoading}
          variant="contained"
          type="submit"
        >
          Entrar
        </LoadingButton>
      </LoginContainer>
    </MainContainer>
  );
};
