import { Grid, Stack, Typography, Paper, TextField } from "@mui/material";

interface CreatePJDataProps {
  data: String[];
  setState(key: string, value: any): void;
}

export function CreatePJData({ data, setState }: CreatePJDataProps) {
  return (
    <Grid item xs={12} lg={12}>
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle2"
          color="GrayText"
          sx={{ fontWeight: "bold" }}
        >
          Dados da pessoa jurídica
        </Typography>
        <Paper elevation={0} sx={{ padding: 2, backgroundColor: "#f2f5f9" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                value={data[0]}
                size="small"
                id="outlined-razao"
                label="* Razão Social"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("razao_social_pj", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                value={data[1]}
                size="small"
                id="outlined-nomefantasia"
                label="* Nome Fantasia"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("nome_fantasia_pj", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                value={data[2]}
                size="small"
                id="outlined-cnpj"
                label="* CNPJ"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("cnpj", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField
                value={data[3]}
                size="small"
                id="outlined-telefone"
                label="Telefone"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("telefone_pj", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField
                value={data[4]}
                size="small"
                id="outlined-status"
                label="Status"
                variant="outlined"
                fullWidth
                onChange={(e) => setState("status_registro_pj", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Grid>
  );
}
