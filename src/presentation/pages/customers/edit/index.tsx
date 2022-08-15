import { useEffect, useState } from "react";
import { InnerContent } from "@/presentation/components/inner-content";
import { HeaderContent } from "@/presentation/components/header-content";
import { Customer, Partner, User } from "@/data/entities";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  GetCustomersContent,
  GetPartnersContent,
  GetUsersContent,
} from "@/domain/models";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  FormLabel,
  Radio,
  Box,
} from "@mui/material";
import Text from "@/presentation/components/text";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";
import { UpdateCustomerParams } from "@/domain/usecases";
import { ErrorBoundary } from "@/presentation/error-boundary";
import { EditPJData } from "./edit-pj-data";
import { EditRepPJData } from "./edit-reppj-data";
import { EditCommonData } from "./common-data";

export interface EditCustomerProps {
  customer: Customer;
  partner: Partner;
  validation: Validation;
}

interface RouteState {
  customerparams: UpdateCustomerParams;
}

export const EditCustomer = ({
  customer,
  partner,
  validation,
}: EditCustomerProps) => {
  const { customerparams } = useLocation().state as RouteState;
  const [currCustomer, setCurrCustomer] = useState(
    customerparams as UpdateCustomerParams
  );
  const typecertificate = currCustomer.menu.toUpperCase();
  const [isLoading, setIsLoading] = useState(false);
  const [partners, setPartners] = useState([] as GetPartnersContent[]);

  const { id } = useParams();
  const navigation = useNavigate();

  const queryClient = useQueryClient();

  let address: String[] = [];
  if (typecertificate === "CPF") {
    address = [
      currCustomer.end_logradouro ? currCustomer.end_logradouro : "-",
      currCustomer.end_numero ? currCustomer.end_numero : "-",
      currCustomer.end_complemento ? currCustomer.end_complemento : "-",
      currCustomer.end_bairro ? currCustomer.end_bairro : "-",
      currCustomer.end_cidade ? currCustomer.end_cidade : "-",
      currCustomer.end_uf ? currCustomer.end_uf : "-",
      currCustomer.end_cep ? currCustomer.end_cep : "-",
    ];
  } else if (typecertificate === "CNPJ") {
    address = [
      currCustomer.endpj_logradouro ? currCustomer.endpj_logradouro : "-",
      currCustomer.endpj_numero ? currCustomer.endpj_numero : "-",
      currCustomer.endpj_complemento ? currCustomer.endpj_complemento : "-",
      currCustomer.endpj_bairro ? currCustomer.endpj_bairro : "-",
      currCustomer.endpj_cidade ? currCustomer.endpj_cidade : "-",
      currCustomer.endpj_uf ? currCustomer.endpj_uf : "-",
      currCustomer.endpj_cep ? currCustomer.endpj_cep : "-",
    ];
  } else {
    address = new Array(7).fill("-");
  }

  async function handleGetPartners() {
    const response = await partner.get();
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

  async function handleEditCustomer() {
    let requiredFields = [
      "id",
      "telefone",
      "nome_contato",
      "voucher",
      "email",
      "cpf",
    ];
    if (typecertificate === "CNPJ") {
      requiredFields.push(
        "razao_social_pj",
        "nome_fantasia_pj",
        "cnpj",
        "nome_admin_pj",
        "endpj_logradouro",
        "endpj_numero",
        "endpj_bairro",
        "endpj_cidade",
        "endpj_cep",
        "endpj_uf"
      );
    } else if (typecertificate === "CPF") {
      requiredFields.push(
        "end_logradouro",
        "end_numero",
        "end_bairro",
        "end_cidade",
        "end_cep",
        "end_uf",
        "name"
      );
    }
    for (const field in requiredFields) {
      const value = validation.validate(
        requiredFields[field],
        currCustomer[requiredFields[field]]
      );
      if (value) {
        toast.error(value);
        return;
      }
    }

    let params;

    if (typecertificate === "CPF") {
      params = {
        ...currCustomer,
        endpj_logradouro: "",
        endpj_numero: "",
        endpj_complemento: "",
        endpj_bairro: "",
        endpj_cidade: "",
        endpj_cep: "",
        endpj_uf: "",
        razao_social_pj: "",
        nome_fantasia_pj: "",
        cnpj: "",
        nome_admin_pj: "",
        data_fundacao_pj: null,
        telefone_pj: "",
        status_registro_pj: "",
        endpj_codibgemunicipio: "",
        endpj_codigoibgeuf: "",
        cpf_admin_pj: "",
        datanasc_admin_pj: null,
      };
    } else if (typecertificate === "CNPJ") params = currCustomer;

    try {
      setIsLoading(true);
      const response = await customer.update(id, params);
      if (!response.success) {
        setIsLoading(false);
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      toast.info("Cliente alterado com sucesso!");
      const customers =
        queryClient.getQueryData<GetCustomersContent[]>("customers");
      if (customers) {
        const newCustomer = customers.map((customer) => {
          return customer.uid === id
            ? { ...customer, ...currCustomer }
            : customer;
        });
        queryClient.setQueryData("customers", newCustomer);
        navigation("/customers", {
          state: { customer: currCustomer },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  function handleBackToList() {
    navigation("/customers", {
      state: { customer: currCustomer },
    });
  }

  function setState(key: string, value: any) {
    setCurrCustomer({ ...currCustomer, [key]: value });
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Edição de clientes"
        subtext="Edição de clientes cadastrados no sistema"
      />
      <Text color="error">Os campos com * são obrigatórios.</Text>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(4) }}>
        <Grid container spacing={2}>
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
          <Grid item xs={12} lg={2}>
            <TextField
              value={currCustomer.telefone}
              onChange={(e) =>
                setCurrCustomer({ ...currCustomer, telefone: e.target.value })
              }
              size="small"
              id="phone"
              label="* Telefone"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              value={currCustomer.nome_contato}
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  nome_contato: e.target.value,
                })
              }
              size="small"
              id="name"
              label="* Nome"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              value={currCustomer.voucher}
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  voucher: e.target.value,
                })
              }
              size="small"
              id="voucher"
              label="* Voucher"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="partner">* Parceiro</InputLabel>
              <Select
                size="small"
                value={currCustomer.idparceiro}
                labelId="partner"
                id="partner"
                fullWidth
                label="* Parceiro"
                onChange={(e) => setState("idparceiro", e.target.value)}
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

          <Grid item xs={12} lg={3}>
            <TextField
              value={currCustomer.id}
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  id: e.target.value,
                })
              }
              size="small"
              id="id"
              label="* ID."
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <TextField
              value={currCustomer.email}
              onChange={(e) =>
                setCurrCustomer({
                  ...currCustomer,
                  email: e.target.value,
                })
              }
              size="small"
              id="email"
              label="* E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <EditCommonData
            setState={setState}
            type={typecertificate}
            data={
              typecertificate === "CPF"
                ? [
                    {
                      fieldName: "end_logradouro",
                      value: currCustomer.end_logradouro,
                    },
                    {
                      fieldName: "end_numero",
                      value: currCustomer.end_numero,
                    },
                    {
                      fieldName: "end_complemento",
                      value: currCustomer.end_complemento,
                    },
                    {
                      fieldName: "end_bairro",
                      value: currCustomer.end_bairro,
                    },
                    {
                      fieldName: "end_cidade",
                      value: currCustomer.end_cidade,
                    },
                    {
                      fieldName: "end_cep",
                      value: currCustomer.end_cep,
                    },
                    {
                      fieldName: "end_uf",
                      value: currCustomer.end_uf,
                    },
                    {
                      fieldName: "email",
                      value: currCustomer.email,
                    },
                    {
                      fieldName: "cpf",
                      value: currCustomer.cpf,
                    },
                  ]
                : [
                    {
                      fieldName: "endpj_logradouro",
                      value: currCustomer.endpj_logradouro,
                    },
                    {
                      fieldName: "endpj_numero",
                      value: currCustomer.endpj_numero,
                    },
                    {
                      fieldName: "endpj_complemento",
                      value: currCustomer.endpj_complemento,
                    },
                    {
                      fieldName: "endpj_bairro",
                      value: currCustomer.endpj_bairro,
                    },
                    {
                      fieldName: "endpj_cidade",
                      value: currCustomer.endpj_cidade,
                    },
                    {
                      fieldName: "endpj_cep",
                      value: currCustomer.endpj_cep,
                    },
                    {
                      fieldName: "endpj_uf",
                      value: currCustomer.endpj_uf,
                    },
                    {
                      fieldName: "email",
                      value: currCustomer.email,
                    },
                  ]
            }
          />
          {typecertificate === "CNPJ" && (
            <EditRepPJData
              data={[
                currCustomer.cpf,
                currCustomer.nome_admin_pj,
                currCustomer.end_logradouro,
                currCustomer.end_numero,
                currCustomer.end_complemento,
                currCustomer.end_bairro,
                currCustomer.end_cidade,
                currCustomer.end_uf,
              ]}
              setState={setState}
            />
          )}

          {typecertificate === "CNPJ" && (
            <EditPJData
              data={[
                currCustomer.razao_social_pj,
                currCustomer.nome_fantasia_pj,
                currCustomer.cnpj,
                currCustomer.telefone_pj,
                currCustomer.status_registro_pj,
              ]}
              setState={setState}
            />
          )}
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
            onClick={handleEditCustomer}
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
