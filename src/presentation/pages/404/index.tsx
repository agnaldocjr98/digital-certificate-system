import {
  Box,
  Typography,
  Container,
  Button,
  OutlinedInput,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const MainContent = styled(Box)(
  ({ theme }) => `
    width: 100%;
    height: 100vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

export function Status404() {
  return (
    <MainContent>
      <Container maxWidth="md">
        <Box textAlign="center">
          <img alt="404" height={180} src="/images/404.svg" />
          <Typography variant="h2" sx={{ my: 2 }}>
            Página não encontrada :(
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{ mb: 4 }}
          >
            A página que você tentou acessar está indisponível
            <br />
            ou não existe mais
          </Typography>
        </Box>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button href="/home" variant="outlined">
            Voltar para a página inicial
          </Button>
        </Container>
      </Container>
    </MainContent>
  );
}
