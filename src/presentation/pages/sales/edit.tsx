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
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Text from "@/presentation/components/text";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
import { Validation } from "@/presentation/protocols/validation";
import { toast } from "react-toastify";

const labelCheckBox = { inputProps: { "aria-label": "Checkbox demo" } };

export interface EditUserProps {
  sale: Sale;
  validation: Validation;
}

interface State {
  sale: {
    uid: string;
    documento: string;
    tipocertificado: string;
    idparceiro: number;
    pago: boolean;
  };
}

export function EditSale({ sale, validation }: EditUserProps) {
  const state: State = useLocation().state as State;
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { uid } = state.sale;

  const [currSale, setCurrSale] = useState({
    documento: state.sale.documento,
    tipocertificado: state.sale.tipocertificado.toLowerCase(),
    idparceiro: state.sale.idparceiro,
    pago: state.sale.pago,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditSale() {
    try {
      let value = "";
      value = validation.validate("documento", currSale.documento);
      if (value) {
        toast.error(value);
        return;
      }
      value = validation.validate("tipocertificado", currSale.tipocertificado);
      if (value) {
        toast.error(value);
        return;
      }

      setIsLoading(true);
      const response = await sale.update(uid, currSale);
      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      toast.info("Venda alterada com sucesso!");

      const sales = queryClient.getQueryData<GetSalesContent[]>("sales");
      if (sales) {
        const newSales = sales.map((sale) => {
          return sale.uid === uid ? { ...sale, ...currSale } : sale;
        });
        queryClient.setQueryData("sales", newSales);
        navigation("/sales", {
          state: { sale: currSale },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  function handleBackToList() {
    navigation("/sales", {
      state: { sale: currSale },
    });
  }

  return (
    <InnerContent>
      <HeaderContent
        text="Edição de Venda"
        subtext="Edição de venda cadastradas por parceiros"
      />
      <Text color="error">Os campos com * são obrigatórios.</Text>
      <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(4) }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              value={currSale.documento}
              onChange={(e) =>
                setCurrSale({ ...currSale, documento: e.target.value })
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
                value={currSale.tipocertificado}
                label="* Tipo certificado"
                onChange={(e) =>
                  setCurrSale({ ...currSale, tipocertificado: e.target.value })
                }
              >
                <MenuItem value="e-cpf">e-CPF</MenuItem>
                <MenuItem value="e-cnpj">e-CNPJ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currSale.pago}
                    value={currSale.pago}
                    onChange={(e) =>
                      setCurrSale({ ...currSale, pago: e.target.checked })
                    }
                  />
                }
                label="Pago?"
              />
            </FormGroup>
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
            onClick={handleEditSale}
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
}
