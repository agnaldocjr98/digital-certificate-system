import React, { useState } from "react";
import { Criptography } from "@/helpers/crypt-decript";
import { Box, FormControl, TextField, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Authentication } from "@/data/entities/authentication";
import { Validation } from "@/presentation/protocols/validation";
import { setUserData } from "@/presentation/redux/slices/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  authentication: Authentication;
  validation: Validation;
}

export function Login({ authentication, validation }) {
  const [state, setState] = useState({
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={onHandleLogin}>
        <Stack
          display="flex"
          direction="column"
          gap={2}
          maxWidth="280px"
          width="280px"
          p={2}
        >
          <img src="/images/logo.png" alt="Logo Identite" />
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
        </Stack>
      </form>
    </Box>
  );
}
