import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationContent } from "@/domain/models";
import { Criptography, Decriptography } from "@/helpers/crypt-decript";

interface UserDataProps extends AuthenticationContent {
  labelTipo: string;
}

const initialState: AuthenticationContent = {
  email: "",
  id: -1,
  nome: "",
  tipo: "",
  valid: false,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<AuthenticationContent>) {
      localStorage.clear();
      localStorage.setItem(
        "identite@userdata",
        Criptography(JSON.stringify(payload))
      );
      return payload;
    },
  },
});

export const getUserData = (state) => {
  const stringUserData = localStorage.getItem("identite@userdata");
  const json = Decriptography(String(stringUserData));
  let userDataJson = JSON.parse(json) as UserDataProps;
  userDataJson.labelTipo =
    userDataJson.tipo === "AR"
      ? "Agente de registro"
      : userDataJson.tipo === "AV"
      ? "Agente de vídeo"
      : userDataJson.tipo === "GE"
      ? "Administrador"
      : "Tipo não identificado";

  return userDataJson;
};
export const { setUserData } = slice.actions;
export default slice.reducer;
