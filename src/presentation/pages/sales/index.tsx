import { FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Sale } from "@/data/entities";
import { HeaderContent } from "@/presentation/components/header-content";
import { InnerContent } from "@/presentation/components/inner-content";
import { Box, Paper, TextField, Stack } from "@mui/material";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import { GetSalesParams } from "@/domain/usecases";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import {
  FormatTimeZoneIdentite,
  IniFinDateOfDay,
  ValidDateString,
} from "@/helpers";
import { toast } from "react-toastify";
import { ListSalesTable } from "./table";
import { useQuery } from "react-query";
import { GetSalesContent } from "@/domain/models";
import { useNavigate } from "react-router";

interface ListSalesProps {
  sale: Sale;
}

export function ListSales({ sale }: ListSalesProps) {
  const { iniDate, finDate } = IniFinDateOfDay();
  const { idparceiro } = useSelector(getUserData);
  const [state, setState] = useState({
    search: "",
    initialDate: iniDate,
    finalDate: finDate,
  });
  const navigation = useNavigate();
  const { data, isFetching, refetch } = useQuery<GetSalesContent[]>(
    "sales",
    async () => {
      try {
        const iniDate = ValidDateString(state.initialDate);
        const FinDate = ValidDateString(state.finalDate);

        if (state.initialDate > state.finalDate) {
          toast.info("A Data inicial não pode ser maior do que a data final!");
          return;
        }

        if (!idparceiro) {
          toast.error("Id do parceiro não encontrado!");
          return;
        }
        const params: GetSalesParams = {
          ...(!!state.search && { search: state.search }),
          datetimestart: FormatTimeZoneIdentite(iniDate),
          datetimeend: FormatTimeZoneIdentite(FinDate),
          idpartner: idparceiro,
        };

        const response = await sale.get(params);

        if (!response.success) {
          toast.error(response.errorMessage);
          return;
        }
        if (response.content.length === 0) {
          toast.error("Nenhuma venda encontrada!");
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

  async function handleGetSales(e: FormEvent) {
    e.preventDefault();
    refetch();
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Lista de vendas"
        subtext="Vendas cadastradas por parceiros"
        labelButton="Adicionar"
        onClickButton={() =>
          navigation("/sales/create", {
            state: { page: "identite#createsale" },
          })
        }
      />

      <Paper elevation={0}>
        <Stack>
          <Box p={2}>
            <form onSubmit={handleGetSales}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  value={state.search}
                  size="small"
                  id="voucprotcpf"
                  label="Voucher, prot., CPF/CNPJ"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState({ ...state, search: e.target.value })
                  }
                />
                <IdentiteDateTimePicker
                  label="Data Inicial"
                  name="initialDate"
                  value={state.initialDate}
                  setvalue={(e) => setState({ ...state, initialDate: e })}
                />
                <IdentiteDateTimePicker
                  label="Data Final"
                  name="FinalDate"
                  value={state.finalDate}
                  setvalue={(e) => setState({ ...state, finalDate: e })}
                />
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isFetching}
                >
                  Buscar
                </LoadingButton>
              </Stack>
            </form>
          </Box>

          {!isFetching && data?.length > 0 && (
            <ListSalesTable data={data} idparceiro={idparceiro} />
          )}
        </Stack>
      </Paper>
    </InnerContent>
  );
}
