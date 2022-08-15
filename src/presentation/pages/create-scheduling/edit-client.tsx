import React, { useState, useEffect } from "react";
import {
  Dialog,
  Grid,
  Slide,
  TextField,
  Stack,
  Theme,
  Button,
  DialogTitle,
  IconButton,
  styled,
  DialogContent,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import CloseIcon from "@mui/icons-material/Close";
import { Customer, Partner } from "@/data/entities";
import { UpdateCustomerParams } from "@/domain/usecases";
import { GetPartnersContent } from "@/domain/models";
import { AxiosHttpAdapter } from "@/infra/http";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentClient,
  useRegisterScheduling,
} from "@/presentation/redux/slices";

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface EditClientSchedulingProps {
  uid: string;
  customer: Partial<UpdateCustomerParams>;
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

export function EditClientScheduling({
  uid,
  customer,
  open,
  toggleModal,
}: EditClientSchedulingProps) {
  const httpClient = new AxiosHttpAdapter();
  const instancePartner = new Partner(httpClient);
  const instanceCustomer = new Customer(httpClient);

  const [currCustomer, setCurrCustomer] = useState(customer);
  const [partners, setPartners] = useState([] as GetPartnersContent[]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentClient } = useSelector(useRegisterScheduling);
  const dispatch = useDispatch();

  async function handleGetPartners() {
    const response = await instancePartner.get();
    if (!response.success) {
      toast.error(response.errorMessage);
      return;
    }
    if (response.content.length === 0) {
      toast.error("Nenhum parceiro encontrado!");
      return;
    }
    setPartners(response.content);
  }

  useEffect(() => {
    handleGetPartners().catch((error) =>
      toast.error("message" in error ? error.message : error)
    );
  }, []);

  async function handleEditClient() {
    let requiredFields = [
      { field: "menu", label: "Tipo de certificado" },
      { field: "id", label: "ID." },
      { field: "nome_contato", label: "Nome" },
      { field: "telefone", label: "Telefone" },
      { field: "email", label: "E-mail" },
    ];
    for (const idx in requiredFields) {
      const { field, label } = requiredFields[idx];
      if (currCustomer[field] === "") {
        toast.error(`O campo ${label} é obrigatório!`);
        break;
      }
    }
    if (currCustomer.idparceiro === -1) {
      toast.error("O campo 'Parceiro' é obrigatório!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await instanceCustomer.update(uid, currCustomer);
      if (!response.success) {
        setIsLoading(false);
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      toast.info("Cliente alterado com sucesso!");
      dispatch(
        changeCurrentClient({
          ...currentClient,
          id: currCustomer.id,
          email: currCustomer.email,
          tipocertificado:
            currCustomer.menu === "CPF"
              ? "e-CPF"
              : currCustomer.menu === "CNPJ"
              ? "e-CNPJ"
              : "",
          clienteblip: currCustomer.nome_contato,
          idparceiro: currCustomer.idparceiro,
          parceiro: currCustomer.parceiro,
        })
      );
      toggleModal();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
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
          <Grid item xs={12} lg={12}>
            <FormControl>
              <FormLabel id="typecertificate">Tipo de certificado</FormLabel>
              <RadioGroup
                row
                aria-labelledby="typecertificate"
                defaultValue={currCustomer.menu}
                name="rgTypeCertificate"
                onChange={(e) =>
                  setCurrCustomer({ ...currCustomer, menu: e.target.value })
                }
              >
                <FormControlLabel
                  value="CPF"
                  control={<Radio />}
                  label="e-CPF"
                />
                <FormControlLabel
                  value="CNPJ"
                  control={<Radio />}
                  label="e-CNPJ"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {currCustomer.menu === "CPF" && (
            <Grid item xs={12} lg={12}>
              <TextField
                value={currCustomer.cpf}
                size="small"
                id="outlined-cpf"
                label="CPF"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setCurrCustomer({
                    ...currCustomer,
                    cpf: e.target.value,
                  })
                }
              />
            </Grid>
          )}
          {currCustomer.menu === "CNPJ" && (
            <Grid item xs={12} lg={6}>
              <TextField
                value={currCustomer.cnpj}
                size="small"
                id="outlined-cnpj"
                label="CNPJ"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setCurrCustomer({
                    ...currCustomer,
                    cnpj: e.target.value,
                  })
                }
              />
            </Grid>
          )}
          {currCustomer.menu === "CNPJ" && (
            <Grid item xs={12} lg={6}>
              <TextField
                value={currCustomer.razao_social_pj}
                size="small"
                id="outlined-razaosocial"
                label="Razão Social"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setCurrCustomer({
                    ...currCustomer,
                    razao_social_pj: e.target.value,
                  })
                }
              />
            </Grid>
          )}
          <Grid item xs={12} lg={9}>
            <TextField
              value={currCustomer.nome_contato}
              size="small"
              id="outlined-clientblip"
              label="Cliente Blip"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  nome_contato: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              value={currCustomer.telefone}
              size="small"
              id="outlined-telefone"
              label="Telefone"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  telefone: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <TextField
              value={currCustomer.email}
              size="small"
              id="outlined-email"
              label="E-mail"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  email: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              value={currCustomer.id}
              size="small"
              id="outlined-id"
              label="ID."
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  id: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="partner">* Parceiro</InputLabel>
              <Select
                size="small"
                value={currCustomer.idparceiro}
                labelId="partner"
                id="partner"
                fullWidth
                label="* Parceiro"
                onChange={(e) =>
                  setCurrCustomer({
                    ...currCustomer,
                    idparceiro: e.target.value as number,
                    parceiro: partners.find(
                      (partner) => partner.id === e.target.value
                    ).nomerazaosocial,
                  })
                }
              >
                {partners.map((partner) => {
                  return (
                    <MenuItem value={partner.id} key={partner.id}>
                      <strong>{partner.nomerazaosocial}</strong>
                      {" - "} {partner.cpfcnpj}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          paddingTop={2}
        >
          <Button variant="contained" onClick={handleEditClient} autoFocus>
            Alterar
          </Button>
          <Button variant="contained" onClick={toggleModal}>
            Fechar
          </Button>
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
}
