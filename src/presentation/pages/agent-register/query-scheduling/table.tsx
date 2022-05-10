import { useState } from "react";
import { Box, Tooltip, IconButton, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetSchedulingsContent } from "@/domain/models";
import { AgentRegisterQuerySchedulingDetails } from "./modals/details";
import { AgentRegisterQuerySchedulingReSchedule } from "./modals/reschedule";
import {
  CircleRounded,
  PendingTwoTone,
  CancelTwoTone,
  ThumbUpTwoTone,
  VideoCameraBackTwoTone,
  DateRangeTwoTone,
  CheckCircleTwoTone,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { AgentRegisterQuerySchedulingCancelProcess } from "./modals/cancel";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { Link } from "react-router-dom";
import moment from "moment";

interface AgentRegisterQuerySchedulingTableProps {
  data: GetSchedulingsContent[];
}

export function AgentRegisterQuerySchedulingTable({
  data,
}: AgentRegisterQuerySchedulingTableProps) {
  const [scheduling, setScheduling] = useState({} as GetSchedulingsContent);

  const { tipo } = useSelector(getUserData);

  const [reScheduleOpen, setReScheduleOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function CloseModal(name: string) {
    switch (name) {
      case "reScheduleOpen":
        setReScheduleOpen(false);
        break;
      case "cancelOpen":
        setCancelOpen(false);
        break;
      case "detailsOpen":
        setDetailsOpen(false);
        break;
      default:
        break;
    }
  }

  function OpenModal(name: string, values?: GetSchedulingsContent) {
    switch (name) {
      case "reScheduleOpen":
        {
          if (tipo !== "AR" && tipo !== "GE") {
            toast.error("Você não tem direito para acessar esta operação!");
            return;
          }
          if (!values.requerreagendamento) {
            toast.error(
              <span>
                Somente registros com a videoconferência realizada podem ser
                reagendados!
              </span>
            );
            return;
          }
          setReScheduleOpen(true);
        }

        break;
      case "detailsOpen":
        setDetailsOpen(true);
        break;
      default:
        break;
    }
  }

  const columns: GridColDef[] = [
    {
      field: "uid",
      headerName: "UID",
      width: 170,
      hide: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        function TypeIcon() {
          switch (params.value) {
            case "Agendado":
              return <Chip label="Agendado" color="primary" size="small" />;
            case "Confirmado":
              return <Chip label="Confirmado" color="success" size="small" />;
            case "Em vídeo":
              return (
                <Chip
                  label="Em vídeo"
                  sx={{ color: "white", backgroundColor: "secondary.dark" }}
                  size="small"
                />
              );
            case "Finalizado Vídeo":
              return (
                <Chip label="Finalizado Video" color="info" size="small" />
              );
            case "Encerrado":
              return <Chip label="Encerrado" color="success" size="small" />;
            case "Reagendado":
              return <Chip label="Reagendado" color="warning" size="small" />;
            case "Cancelado":
              return <Chip label="Cancelado" color="error" size="small" />;
            default:
              return <Chip label="Não encontrado" color="error" size="small" />;
          }
        }
        return TypeIcon();
      },
    },
    {
      field: "dataagendamento",
      headerName: "Data agendamento",
      width: 145,
      minWidth: 145,
      maxWidth: 145,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        moment(params.value).utc().format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "parceiro",
      headerName: "Parceiro",
      type: "string",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "agtregistro",
      headerName: "Agt. registro",
      width: 140,
      minWidth: 140,
      maxWidth: 140,
      headerAlign: "center",
      valueFormatter: ({ value }) => value.nome,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 210,
      minWidth: 210,
      maxWidth: 210,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "foiemitido",
      headerName: "Emitido?",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <CircleRounded fontSize="small" sx={{ color: "success.dark" }} />
        ) : (
          <CircleRounded fontSize="small" sx={{ color: "error.dark" }} />
        ),
    },
    {
      field: "aprovado",
      headerName: "Aprovado?",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <CircleRounded fontSize="small" sx={{ color: "success.dark" }} />
        ) : (
          <CircleRounded fontSize="small" sx={{ color: "error.dark" }} />
        ),
    },
    {
      field: ".",
      headerName: "Acões",
      align: "center",
      flex: 1,
      minWidth: 250,
      maxWidth: 250,
      headerAlign: "center",

      renderCell: (params) => {
        const handleModal = async (name: string) => {
          const rows = params.row;
          return OpenModal(name, rows);
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Detalhes" size="small">
              <Tooltip title="Detalhes" placement="top-start">
                <div>
                  <PendingTwoTone
                    onClick={() => handleModal("detailsOpen")}
                    sx={{ color: "primary.dark" }}
                  />
                </div>
              </Tooltip>
            </IconButton>

            {(tipo === "AV" || tipo === "GE") &&
              params.row.status === "Agendado" && (
                <IconButton aria-label="Confirmar Agendamento" size="small">
                  <Tooltip title="Confirmar agendamento" placement="top-start">
                    <Link
                      target="_blank"
                      to={{
                        pathname: "/agentvideo/confirm/" + params.row.uid,
                      }}
                    >
                      <ThumbUpTwoTone sx={{ color: "info.dark" }} />
                    </Link>
                  </Tooltip>
                </IconButton>
              )}

            {(tipo === "AV" || tipo === "GE") &&
              params.row.status === "Confirmado" && (
                <IconButton aria-label="Entrar em Vídeo" size="small">
                  <Tooltip title="Entrar em vídeo" placement="top-start">
                    <Link
                      target="_blank"
                      to={{
                        pathname: "/agentvideo/register/" + params.row.uid,
                      }}
                    >
                      <VideoCameraBackTwoTone sx={{ color: "warning.dark" }} />
                    </Link>
                  </Tooltip>
                </IconButton>
              )}

            {(tipo === "AR" || tipo === "GE") &&
              params.row.requerreagendamento && (
                <IconButton aria-label="Reagendar" size="small">
                  <Tooltip title="Reagendar" placement="top-start">
                    <div>
                      <DateRangeTwoTone
                        sx={{ color: "warning.dark" }}
                        onClick={() => handleModal("reScheduleOpen")}
                      />
                    </div>
                  </Tooltip>
                </IconButton>
              )}

            {(tipo === "AR" || tipo === "GE") &&
              params.row.status === "Finalizado Vídeo" &&
              !params.row.requerreagendamento && (
                <IconButton aria-label="Finalizar Atendimento" size="small">
                  <Tooltip title="Finalizar Atendimento" placement="top-start">
                    <Link
                      target="_blank"
                      to={{
                        pathname:
                          "/agentregister/finishscheduling/" + params.row.uid,
                      }}
                    >
                      <CheckCircleTwoTone sx={{ color: "success.dark" }} />
                    </Link>
                  </Tooltip>
                </IconButton>
              )}

            {(tipo === "AR" || tipo === "GE") && (
              <IconButton aria-label="Cancelar" size="small">
                <Tooltip title="Cancelar" placement="top-start">
                  <div>
                    <CancelTwoTone
                      sx={{ color: "error.dark" }}
                      onClick={() => handleModal("cancelOpen")}
                    />
                  </div>
                </Tooltip>
              </IconButton>
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(2),
        width: "100%",
      }}
    >
      <DataGrid
        getRowId={(row) => row.uid}
        onCellClick={(e) => {
          setScheduling(e.row);
        }}
        rows={data}
        columns={columns}
        pageSize={10}
        hideFooterSelectedRowCount
        autoHeight
      />

      <AgentRegisterQuerySchedulingCancelProcess
        uid={scheduling.uid}
        open={cancelOpen}
        setOpen={CloseModal}
        name={scheduling.nome}
      />

      <AgentRegisterQuerySchedulingReSchedule
        open={reScheduleOpen}
        setOpen={CloseModal}
        schedule={scheduling}
      />

      <AgentRegisterQuerySchedulingDetails
        open={detailsOpen}
        setOpen={CloseModal}
        schedule={scheduling}
      />
    </Box>
  );
}
