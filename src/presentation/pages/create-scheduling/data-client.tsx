import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button, Box, TextField, Stack } from "@mui/material";
import moment from "moment";
import {
  changeIndex,
  useRegisterScheduling,
} from "@/presentation/redux/slices/register-scheduling";
import { EditClientScheduling } from "./edit-client";

const textFieldStyle = {
  color: "#4A5568",
};

const textFieldStyleName = {
  color: "#4A5568",
  fontWeight: "bold",
};

export const DataClient = () => {
  const { currentClient } = useSelector(useRegisterScheduling);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleToggleModal() {
    setIsOpenModal(!isOpenModal);
  }
  return (
    <Box sx={{ width: { xs: "100%", sm: "80%" } }}>
      <Stack spacing={1.5}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              sx={{ input: textFieldStyleName }}
              value={currentClient.nome}
              size="small"
              id="outlined-nome"
              label="Nome"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.email}
              size="small"
              id="outlined-email"
              label="E-Mail"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.numero}
              size="small"
              id="outlined-numero"
              label="Número"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.id}
              size="small"
              id="outlined-id"
              label="ID"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.tipocertificado}
              size="small"
              id="outlined-tipocertificado"
              label="Tipo de certificado"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.clienteblip}
              size="small"
              id="outlined-cliblip"
              label="Cliente Blip"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.telefone}
              size="small"
              id="outlined-telefone"
              label="Telefone"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={moment(currentClient.horacadastro).format(
                "DD/MM/YYYY HH:mm:ss"
              )}
              size="small"
              id="outlined-datahoracad"
              label="Data/Hora cadastro"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={currentClient.idparceiro ? currentClient.parceiro : "-"}
              size="small"
              id="outlined-partner"
              label="Parceiro"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" onClick={() => dispatch(changeIndex(2))}>
            Prosseguir
          </Button>
          <Button variant="contained" onClick={handleToggleModal}>
            Alterar cliente
          </Button>
        </Stack>
      </Stack>
      {isOpenModal && (
        <EditClientScheduling
          uid={currentClient.uid}
          customer={{
            email: currentClient.email,
            id: currentClient.id,
            menu: currentClient.tipocertificado.toUpperCase().includes("CPF")
              ? "CPF"
              : currentClient.tipocertificado.toUpperCase().includes("CNPJ")
              ? "CNPJ"
              : "",
            nome_contato: currentClient.clienteblip,
            telefone: currentClient.telefone,
            parceiro: "",
            idparceiro: currentClient.idparceiro,
            cnpj: currentClient.cpfcnpj,
            cpf: currentClient.cpfcnpj,
            razao_social_pj: currentClient.nome,
          }}
          open={isOpenModal}
          toggleModal={handleToggleModal}
        />
      )}
    </Box>
  );
};
