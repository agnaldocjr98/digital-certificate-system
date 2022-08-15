import { Grid, Stack, Typography, Paper, TextField } from "@mui/material";

interface TypeData {
  fieldName: string;
  value: string;
}

interface CreateCommonDataProps {
  type: string;
  data: TypeData[];
  setState(key: string, value: any): void;
}

export function CreateCommonData({
  type,
  data,
  setState,
}: CreateCommonDataProps) {
  return (
    <>
      {type === "CPF" && (
        <Grid item xs={12} lg={2}>
          <TextField
            value={data[7].value ? data[7].value : ""}
            size="small"
            id="outlined-document"
            label="* CPF"
            variant="outlined"
            fullWidth
            onChange={(e) => setState("cpf", e.target.value)}
          />
        </Grid>
      )}
      <Grid item xs={12} lg={type === "CPF" ? 8 : 10}>
        <TextField
          value={data[0].value ? data[0].value : ""}
          size="small"
          id="outlined-address"
          label="* Logradouro"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[0].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={2}>
        <TextField
          value={data[1].value ? data[1].value : ""}
          size="small"
          id="outlined-number"
          label="* Número"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[1].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          value={data[2].value ? data[2].value : ""}
          size="small"
          id="outlined-complement"
          label="Complemento"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[2].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          value={data[3].value ? data[3].value : ""}
          size="small"
          id="outlined-neighborhood"
          label="* Bairro"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[3].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={2}>
        <TextField
          value={data[4].value ? data[4].value : ""}
          size="small"
          id="outlined-city"
          label="* Cidade"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[4].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={2}>
        <TextField
          value={data[5].value ? data[5].value : ""}
          size="small"
          id="outlined-zipcode"
          label="* CEP"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[5].fieldName, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} lg={1}>
        <TextField
          value={data[6].value ? data[6].value : ""}
          size="small"
          id="outlined-state"
          label="* UF"
          variant="outlined"
          fullWidth
          onChange={(e) => setState(data[6].fieldName, e.target.value)}
        />
      </Grid>
    </>
  );
}
