import { useState } from "react";
import { InnerContent } from "@/presentation/components/inner-content";
import { HeaderContent } from "@/presentation/components/header-content";
import { Sale } from "@/data/entities";
import { useLocation, useNavigate } from "react-router-dom";
import { GetSalesContent } from "@/domain/models";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import Text from "@/presentation/components/text";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices";

interface CreateSaleProps {
  sale: Sale;
  validation: Validation;
}

export const CreateSale = ({ sale, validation }: CreateSaleProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { idparceiro } = useSelector(getUserData);

  const [state, setState] = useState({
    documento: "",
    tipocertificado: "",
    idparceiro: idparceiro,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateUser() {
    try {
      let value = "";
      value = validation.validate("documento", state.documento);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("tipocertificado", state.tipocertificado);
      if (value) {
        toast.error(value);
        return;
      }

      setIsLoading(true);
      const response = await sale.create(state);
      setIsLoading(false);
      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }
      const { uid, voucher } = response.content;
      toast.success("Venda cadastrada com sucesso!");
      const sales = queryClient.getQueryData<GetSalesContent[]>("sales");
      if (sales) {
        const newSales = [...sales, { ...state, uid, voucher }];
        queryClient.setQueryData("sales", newSales);
        navigation("/sales", {
          state: { sale: state },
        });
      } else {
        navigation("/sales", {
          state: { sale: state },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  function handleBackToList() {
    navigation("/sales", {
      state: { sale: state },
    });
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Criação de Venda"
        subtext="Criação de venda por parceiros"
      />
      <Text color="error">Os campos com * são obrigatórios.</Text>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(4) }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              value={state.documento}
              onChange={(e) =>
                setState({ ...state, documento: e.target.value })
              }
              size="small"
              id="document"
              label="* CPF/CNPJ"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="type">* Tipo certificado</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={state.tipocertificado}
                label="* Tipo certificado"
                onChange={(e) =>
                  setState({ ...state, tipocertificado: e.target.value })
                }
              >
                <MenuItem value="e-cpf">e-CPF</MenuItem>
                <MenuItem value="e-cnpj">e-CNPJ</MenuItem>
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
