import { FormEvent, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { HeaderContent } from "@/presentation/components/header-content";
import { InnerContent } from "@/presentation/components/inner-content";
import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { GetCustomersParams } from "@/domain/usecases";
import {
  FormatTimeZoneIdentite,
  IniFinDateOfDay,
  ValidDateString,
} from "@/helpers";
import { toast } from "react-toastify";
import { ListCustomersTable } from "./table";
import { useQuery } from "react-query";
import { GetCustomersContent, GetPartnersContent } from "@/domain/models";
import { useNavigate } from "react-router";
import { Customer, Partner } from "@/data/entities";

interface ListCustomersProps {
  customer: Customer;
  partner: Partner;
}

export function ListCustomers({ customer, partner }: ListCustomersProps) {
  const { iniDate, finDate } = IniFinDateOfDay();
  const [state, setState] = useState({
    search: "",
    initialDate: iniDate,
    finalDate: finDate,
    partners: [] as GetPartnersContent[],
    idpartner: "",
  });

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
    setState({ ...state, partners: response.content });
  }

  useEffect(() => {
    handleGetPartners().catch((error) =>
      toast.error("message" in error ? error.message : error)
    );
  }, []);

  const navigation = useNavigate();

  const { data, isFetching, refetch } = useQuery<GetCustomersContent[]>(
    "customers",
    async () => {
      try {
        const iniDate = ValidDateString(state.initialDate);
        const FinDate = ValidDateString(state.finalDate);

        if (state.initialDate > state.finalDate) {
          toast.info("A Data inicial não pode ser maior do que a data final!");
          return;
        }

        const params: GetCustomersParams = {
          ...(!!state.search && { search: state.search }),
          datetimestart: FormatTimeZoneIdentite(iniDate),
          datetimeend: FormatTimeZoneIdentite(FinDate),
          ...(!!state.idpartner && { idpartner: parseInt(state.idpartner) }),
        };

        const response = await customer.get(params);

        if (!response.success) {
          toast.error(response.errorMessage);
          return;
        }
        if (response.content.length === 0) {
          toast.error("Nenhum cliente encontrada!");
          return;
        }
        return response.content;
      } catch (error) {
        toast.error(error.message);
        return;
      }
    },
    {
      staleTime: 1000 * 60 * 5, //5 minutos,
      enabled: false,
    }
  );

  async function handleGetCustomers(event: FormEvent) {
    event.preventDefault();
    refetch();
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Listagem de clientes"
        subtext="Listagem de clientes cadastrados no sistema"
        labelButton={data ? (data.length > 0 ? "Adicionar" : "") : ""}
        onClickButton={() =>
          navigation("/customers/create", {
            state: { page: "identite#createcustomer" },
          })
        }
      />

      <Paper elevation={0}>
        <Stack>
          <Box p={2}>
            <form onSubmit={handleGetCustomers}>
              <Stack spacing={3}>
                <Typography variant="body1" component="span" color="primary">
                  O campo <strong>PESQUISA</strong> pode ser preenchido com:{" "}
                  <strong>Telefone</strong>, <strong>Nome</strong>,{" "}
                  <strong>Voucher</strong>, <strong>E-mail</strong> ou{" "}
                  <strong>Documento</strong>
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <TextField
                    value={state.search}
                    size="small"
                    id="telnomevoucemailcpf"
                    label="Pesquisa"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState({ ...state, search: e.target.value })
                    }
                  />
                  <IdentiteDateTimePicker
                    label="Perído de cadastro - ínicio"
                    name="initialDate"
                    value={state.initialDate}
                    setvalue={(e) => setState({ ...state, initialDate: e })}
                  />
                  <IdentiteDateTimePicker
                    label="Perído de cadastro - Fim"
                    name="FinalDate"
                    value={state.finalDate}
                    setvalue={(e) => setState({ ...state, finalDate: e })}
                  />

                  <FormControl sx={{ minWidth: 270 }}>
                    <InputLabel id="partner">Parceiro</InputLabel>
                    <Select
                      size="small"
                      value={state.idpartner}
                      labelId="partner"
                      id="partner"
                      label="Parceiro"
                      onChange={(e) =>
                        setState({ ...state, idpartner: e.target.value })
                      }
                    >
                      {state.partners.map((partner) => {
                        return (
                          <MenuItem value={partner.id} key={partner.id}>
                            <strong>{partner.nomerazaosocial}</strong>
                            {" - "} {partner.cpfcnpj}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isFetching}
                  >
                    Buscar
                  </LoadingButton>
                </Stack>
              </Stack>
            </form>
          </Box>

          {!isFetching && data?.length > 0 && (
            <ListCustomersTable customers={data} />
          )}
        </Stack>
      </Paper>
    </InnerContent>
  );
}
