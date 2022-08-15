import React, {
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Dialog,
  Grid,
  Button,
  Box,
  TextField,
  useMediaQuery,
  InputAdornment,
  Divider,
  Stack,
  Theme,
} from "@mui/material";
import { GetSchedulingsContent } from "@/domain/models";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { getUserData } from "@/presentation/redux/slices/user";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { ChangePartner } from "./change-partner";
import moment from "moment";

const textFieldStyle = {
  color: "#4A5568",
};

const textFieldStyleBold = {
  color: "#4A5568",
  fontWeight: "bold",
};

interface DetailsProps {
  schedule: GetSchedulingsContent;
}

export interface ModalHandles {
  handleOpenModal: () => void;
}

const Details: React.ForwardRefRenderFunction<ModalHandles, DetailsProps> = (
  { schedule },
  ref
) => {
  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [isVisible, setIsVisible] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal,
    };
  });

  const { tipo } = useSelector(getUserData);
  const canEdit =
    (tipo === "AR" || tipo === "GE") && schedule.status === "Agendado";

  function handleSetOpenEdit() {
    setOpenEdit(!openEdit);
  }

  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      fullScreen={fullScreen}
      open={isVisible}
    >
      <Box
        sx={{
          paddingX: (theme) => theme.spacing(4),
          paddingBottom: (theme) => theme.spacing(4),
        }}
      >
        <Stack
          id="dialog-details-identite"
          direction="row"
          display="flex"
          alignItems="center"
          spacing={2}
          paddingTop={4}
          paddingBottom={4}
        >
          <AssignmentIndIcon fontSize="large" />
          <Box display="flex" flexDirection="column">
            <span>Cliente</span>
            <strong>{schedule.nome}</strong>
          </Box>
        </Stack>

        <Box>
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
                sx={{ input: textFieldStyleBold }}
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
                sx={{ input: textFieldStyleBold }}
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
            <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={2}>
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
            <Grid item xs={12} lg={2}>
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
            <Grid item xs={12} lg={2}>
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
            <Grid item xs={12} lg={2}>
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
                value={
                  schedule.datareagendamento
                    ? moment(schedule.datareagendamento)
                        .utc()
                        .format("DD/MM/YYYY HH:mm:ss")
                    : "-"
                }
                size="small"
                id="outlined-agtvideo-datareagendamento "
                label="Data do reagendamento"
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
                          color: schedule.ligou ? "success.dark" : "error.dark",
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
                value={
                  schedule.tipoconfirmacao
                    ? schedule.tipoconfirmacao === "L"
                      ? "Ligação"
                      : schedule.tipoconfirmacao === "W"
                      ? "WhatsApp"
                      : schedule.tipoconfirmacao === "S" && "SMS"
                    : "-"
                }
                size="small"
                id="outlined-agtvideo-tipoconfirmacao"
                label="Tipo de confirmação"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      {schedule.tipoconfirmacao &&
                        (schedule.tipoconfirmacao === "L" ? (
                          <LocalPhoneOutlinedIcon
                            fontSize="small"
                            color="primary"
                          />
                        ) : schedule.tipoconfirmacao === "W" ? (
                          <WhatsAppIcon fontSize="small" color="success" />
                        ) : (
                          <TextsmsOutlinedIcon
                            fontSize="small"
                            color="primary"
                          />
                        ))}
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
            <Grid item xs={12} lg={4}>
              <TextField
                sx={{ input: textFieldStyleBold }}
                value={schedule.parceiro ? schedule.parceiro : "-"}
                size="small"
                id="outlined-parceiro "
                label="Parceiro"
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
                rows={1}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <ChangePartner
          open={openEdit}
          setOpen={handleSetOpenEdit}
          data={{
            uid: schedule.uid,
            partner: schedule.parceiro,
            typecertificate: schedule.tipocertificado?.toLowerCase(),
          }}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          paddingTop={2}
        >
          {canEdit && (
            <Button variant="contained" onClick={handleSetOpenEdit}>
              Editar
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => setIsVisible(false)}
            autoFocus
          >
            Fechar
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default forwardRef(Details);
