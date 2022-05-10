import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Box,
  TextField,
  useMediaQuery,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetSchedulingsContent } from "@/domain/models";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import moment from "moment";

const textFieldStyle = {
  color: "#4A5568",
};

const textFieldStyleBold = {
  color: "#4A5568",
  fontWeight: "bold",
};

interface AgentRegisterQuerySchedulingDetailsProps {
  open: boolean;
  setOpen(name: string): void;
  schedule: GetSchedulingsContent;
}

export function AgentRegisterQuerySchedulingDetails({
  open,
  setOpen,
  schedule,
}: AgentRegisterQuerySchedulingDetailsProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        fullScreen={fullScreen}
        open={open}
        onClose={() => console.log("")}
        aria-labelledby="dialog-details-certificate-system"
      >
        <DialogTitle id="dialog-details-certificate-system">
          DETALHES DO AGENDAMENTO - <strong>{schedule.nome}</strong>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ paddingTop: (theme) => theme.spacing(1) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.status ? schedule.status : "-"}
                  size="small"
                  id="outlined-status"
                  label="Status"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color:
                              schedule.status === "Agendado"
                                ? "primary.dark"
                                : schedule.status === "Em vídeo"
                                ? "secondary.main"
                                : schedule.status === "Finalizado Vídeo"
                                ? "warning.dark"
                                : schedule.status === "Encerrado"
                                ? "success.dark"
                                : schedule.status === "Reagendado"
                                ? "warning.dark"
                                : schedule.status === "Cancelado"
                                ? "error.dark"
                                : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={
                    schedule.dataagendamento
                      ? moment(schedule.dataagendamento)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-dataagendamento"
                  label="Data de agendamento"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.nome ? schedule.nome : "-"}
                  size="small"
                  id="outlined-cliente"
                  label="Cliente"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.agtregistro ? schedule.agtregistro.nome : "-"}
                  size="small"
                  id="outlined-agtregistro-nome"
                  label="Agente de registro"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={1}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.foiemitido ? "Sim" : "Não"}
                  size="small"
                  id="outlined-emitido"
                  label="Emitido?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.foiemitido
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={1}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.aprovado ? "Sim" : "Não"}
                  size="small"
                  id="outlined-aprovado"
                  label="Aprovado"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.aprovado
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* dsadassa */}

              <Divider />
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.agenda ? schedule.agenda.descricao : "-"}
                  size="small"
                  id="outlined-agenda-descricao"
                  label="Agenda"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={moment(
                    schedule.datacadastro ? schedule.datacadastro : "-"
                  )
                    .utc()
                    .format("DD/MM/YYYY HH:mm:ss")}
                  size="small"
                  id="outlined-datacadastro"
                  label="Data cadastro"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={
                    schedule.tipocertificado ? schedule.tipocertificado : "-"
                  }
                  size="small"
                  id="outlined-tipocertificado"
                  label="Tipo"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.cpfcnpj ? schedule.cpfcnpj : "-"}
                  size="small"
                  id="outlined-cpfcnpj"
                  label="CPF/CNPJ"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.id ? schedule.id : "-"}
                  size="small"
                  id="outlined-id"
                  label="ID"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.protocolo ? schedule.protocolo : "-"}
                  size="small"
                  id="outlined-protocolo"
                  label="Protocolo"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.email ? schedule.email : "-"}
                  size="small"
                  id="outlined-email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.telefone ? schedule.telefone : "-"}
                  size="small"
                  id="outlined-telefone"
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.clienteblip ? schedule.clienteblip : "-"}
                  size="small"
                  id="outlined-clienteblip"
                  label="Cliente Blip"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyle }}
                  value={schedule.agtvideo ? schedule.agtvideo.nome : "-"}
                  size="small"
                  id="outlined-agtvideo-nome"
                  label="Agt. video"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.dataconfirmacao
                      ? moment(schedule.dataconfirmacao)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-dataconfirmacao"
                  label="Data confirmação"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.datainicio
                      ? moment(schedule.datainicio)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-datainicio "
                  label="Data Início"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.dataentrada
                      ? moment(schedule.dataentrada)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-dataentrada "
                  label="Data entrada"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.datafim
                      ? moment(schedule.datafim)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-datafim "
                  label="Data fim"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.confirmadoagendamento ? "Sim" : "Não"}
                  size="small"
                  id="outlined-confirmadoagendamento"
                  label="Agendamento confirmado?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.confirmadoagendamento
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.ligou ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-ligou"
                  label="Ligou?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.ligou
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.emvideoconferencia ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-emvideoconferencia"
                  label="Em videoconferência?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.emvideoconferencia
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.clientepresente ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-clientepresente"
                  label="Cliente presente?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.clientepresente
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.tempendencia ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-tempendencia"
                  label="tem pendência?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.tempendencia
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.ehpresencial ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-ehpresencial"
                  label="É presencial?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.ehpresencial
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.aprovado ? "Sim" : "Não"}
                  size="small"
                  id="outlined-agtvideo-aprovado"
                  label="Aprovado?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleRoundedIcon
                          fontSize="small"
                          sx={{
                            color: schedule.aprovado
                              ? "success.dark"
                              : "error.dark",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.datareagendamento
                      ? moment(schedule.datareagendamento)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-datareagendamento "
                  label="Data do agendamento"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.dataaprovacao
                      ? moment(schedule.dataaprovacao)
                          .utc()
                          .format("DD/MM/YYYY HH:mm:ss")
                      : "-"
                  }
                  size="small"
                  id="outlined-agtvideo-dataaprovacao "
                  label="Data da aprovação"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={
                    schedule.protocolopagamento
                      ? schedule.protocolopagamento
                      : "-"
                  }
                  size="small"
                  id="outlined-protocolopagamento "
                  label="Protocolo de pagamento"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  sx={{ input: textFieldStyleBold }}
                  value={schedule.observacao ? schedule.observacao : "-"}
                  size="small"
                  id="outlined-agtvideo-observacao "
                  label="Observação"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ marginRight: (theme) => theme.spacing(1.5) }}
            variant="contained"
            onClick={() => setOpen("detailsOpen")}
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
