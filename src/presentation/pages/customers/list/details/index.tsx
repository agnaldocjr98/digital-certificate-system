import React from "react";
import {
  Dialog,
  Grid,
  Box,
  Slide,
  TextField,
  useMediaQuery,
  InputAdornment,
  Stack,
  Theme,
  Button,
  DialogTitle,
  IconButton,
  styled,
  DialogContent,
  Typography,
} from "@mui/material";
import { DetailsCustomerPJ } from "./pj-data";
import { DetailsCustomerRepPJ } from "./rep-pj-data";
import { TransitionProps } from "@mui/material/transitions";
import { GetCustomersContent } from "@/domain/models";
import { BooleanCircle } from "@/presentation/ui-components";
import moment from "moment";

import CloseIcon from "@mui/icons-material/Close";

const textFieldStyle = {
  color: "#4A5568",
};

interface CustomerDetailsProps {
  customer: GetCustomersContent;
  open: boolean;
  toggleModal(): void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CustomerDetails({
  customer,
  open,
  toggleModal,
}: CustomerDetailsProps) {
  const type = customer.menu.toUpperCase();

  let address: String[] = [];
  if (type === "CPF") {
    address = [
      customer.end_logradouro ? customer.end_logradouro : "-",
      customer.end_numero ? customer.end_numero : "-",
      customer.end_complemento ? customer.end_complemento : "-",
      customer.end_bairro ? customer.end_bairro : "-",
      customer.end_cidade ? customer.end_cidade : "-",
      customer.end_cep ? customer.end_cep : "-",
      customer.end_uf ? customer.end_uf : "-",
    ];
  } else if (type === "CNPJ") {
    address = [
      customer.endpj_logradouro ? customer.endpj_logradouro : "-",
      customer.endpj_numero ? customer.endpj_numero : "-",
      customer.endpj_complemento ? customer.endpj_complemento : "-",
      customer.endpj_bairro ? customer.endpj_bairro : "-",
      customer.endpj_cidade ? customer.endpj_cidade : "-",
      customer.endpj_cep ? customer.endpj_cep : "-",
      customer.endpj_uf ? customer.endpj_uf : "-",
    ];
  } else {
    address = new Array(9).fill("-");
  }

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
        {...other}
      >
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <BootstrapDialog maxWidth="md" open={open} TransitionComponent={Transition}>
      <BootstrapDialogTitle id="modal" onClose={toggleModal}>
        <Stack>
          <Typography variant="h6" color="white">
            Cliente - {customer.nome_contato}
          </Typography>
        </Stack>
      </BootstrapDialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2} pt={1}>
          {type === "CNPJ" && (
            <DetailsCustomerRepPJ
              data={[
                customer.cpf,
                customer.nome_admin_pj,
                customer.end_logradouro,
                customer.end_numero,
                customer.end_complemento,
                customer.end_bairro,
                customer.end_cidade,
                customer.end_uf,
              ]}
            />
          )}
          {type === "CNPJ" && (
            <DetailsCustomerPJ
              data={[
                customer.razao_social_pj,
                customer.nome_fantasia_pj,
                customer.cnpj,
                customer.telefone_pj,
                customer.status_registro_pj,
              ]}
            />
          )}

          {type === "CPF" && (
            <Grid item xs={12} lg={2}>
              <TextField
                sx={{ input: textFieldStyle }}
                value={customer.cpf}
                size="small"
                id="outlined-cpf"
                label="CPF"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} lg={type === "CPF" ? 8 : 10}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[0]}
              size="small"
              id="outlined-address"
              label="Logradouro"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[1]}
              size="small"
              id="outlined-number"
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
              value={address[2]}
              size="small"
              id="outlined-complement"
              label="Complemento"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[3]}
              size="small"
              id="outlined-nighborhood"
              label="Bairro"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[4]}
              size="small"
              id="outlined-city"
              label="Cidade"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[5]}
              size="small"
              id="outlined-zipcode"
              label="CEP"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={1}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={address[6]}
              size="small"
              id="outlined-state"
              label="UF"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={
                customer.ehvoucher
                  ? customer.ehvoucher === true
                    ? "Sim"
                    : "Não"
                  : "-"
              }
              size="small"
              id="outlined-ehvoucher"
              label="É Voucher?"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <BooleanCircle
                      success={customer.ehvoucher ? true : false}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={
                customer.ehvoucherdigitado
                  ? customer.ehvoucherdigitado === true
                    ? "Sim"
                    : "Não"
                  : "-"
              }
              size="small"
              id="outlined-ehvoucherdigitado"
              label="Voucher digitado?"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <BooleanCircle
                      success={customer.ehvoucherdigitado ? true : false}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={
                customer.ehprimeirocontato
                  ? customer.ehprimeirocontato === true
                    ? "Sim"
                    : "Não"
                  : "-"
              }
              size="small"
              id="outlined-ehprimeirocontato"
              label="Primeiro contato?"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <BooleanCircle
                      success={customer.ehprimeirocontato ? true : false}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              sx={{ input: textFieldStyle }}
              value={moment(customer.datacad ? customer.datacad : "-")
                .utc()
                .format("DD/MM/YYYY HH:mm:ss")}
              size="small"
              id="outlined-datacadastro"
              label="Data cadastro"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        {/* <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          paddingTop={2}
        >
          <Button variant="contained" onClick={toggleModal} autoFocus>
            Fechar
          </Button>
        </Stack> */}
      </DialogContent>
    </BootstrapDialog>
  );
}
