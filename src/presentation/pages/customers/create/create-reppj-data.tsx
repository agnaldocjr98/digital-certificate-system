import { Grid, Stack, Typography, Paper, TextField } from "@mui/material";

interface CreateRepPJDataProps {
  data: String[];
  setState(key: string, value: any): void;
}

export function CreateRepPJData({ data, setState }: CreateRepPJDataProps) {
  return (
    <Grid item xs={12} lg={12}>
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle2"
          color="GrayText"
          sx={{ fontWeight: "bold" }}
        >
          <strong>Dados do representante</strong>
        </Typography>
        <Paper elevation={0} sx={{ padding: 2, backgroundColor: "#f2f5f9" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <TextField
                value={data[0]}
                size="small"
                id="outlined-cpfrep"
                label="* CPF"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("cpf", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={9}>
              <TextField
                value={data[1]}
                size="small"
                id="outlined-nomerep"
                label="* Nome"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("nome_admin_pj", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={10}>
              <TextField
                value={data[2]}
                size="small"
                id="outlined-logradouro"
                label="Logradouro"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_logradouro", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField
                value={data[3]}
                size="small"
                id="outlined-numero"
                label="Número"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_numero", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                value={data[4]}
                size="small"
                id="outlined-complemento"
                label="Complemento"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_complemento", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <TextField
                value={data[5]}
                size="small"
                id="outlined-bairro"
                label="Bairro"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_bairro", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField
                value={data[6]}
                size="small"
                id="outlined-cidade"
                label="Cidade"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_cidade", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField
                value={data[7]}
                size="small"
                id="outlined-zipcode"
                label="CEP"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_cep", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={1}>
              <TextField
                value={data[8]}
                size="small"
                id="outlined-uf"
                label="UF"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("end_uf", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Grid>
  );
}
