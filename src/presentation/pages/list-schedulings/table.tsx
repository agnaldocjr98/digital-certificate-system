import { useState, useEffect, useRef } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetSchedulingsContent } from "@/domain/models";
import Details, { ModalHandles } from "./modals/details";
import { Reschedule } from "./modals/reschedule";
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
import { CancelScheduling } from "./modals/cancel";
import { useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import { useSchedulings } from "@/presentation/redux/slices/schedulings";
import { HeaderDataGrid } from "@/presentation/ui-components";

interface QuerySchedulingProps {
  data: GetSchedulingsContent[];
}

export function QuerySchedulingTable({ data }: QuerySchedulingProps) {
  const [selectedScheduling, setSelectedScheduling] = useState(
    {} as GetSchedulingsContent
  );

  const { tipo } = useSelector(getUserData);
  const [reScheduleOpen, setReScheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const refDetails = useRef<ModalHandles>();

  function CloseModal(name: string) {
    switch (name) {
      case "reScheduleOpen":
        setReScheduleOpen(false);
        break;
      case "cancelOpen":
        setCancelOpen(false);
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
      case "cancelOpen":
        setCancelOpen(true);
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
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
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
        return (
          <Stack spacing={1} direction="row">
            {TypeIcon()}{" "}
            {params.row.origemreagendamento === true && (
              <DateRangeIcon color="primary" />
            )}
          </Stack>
        );
      },
    },
    {
      field: "agenda",
      headerName: "Ag.",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => {
        const words = params.value.descricao.split(" ");

        let wordAvatar = words.reduce((acc, word) => {
          return (acc = acc + word[0]);
        }, "");
        return (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: (theme) =>
                wordAvatar.includes("G")
                  ? theme.colors.info.dark
                  : wordAvatar.includes("P")
                  ? theme.colors.warning.dark
                  : theme.colors.error.dark,
            }}
          >
            {wordAvatar}
          </Avatar>
        );
      },
    },
    {
      field: "ehpresencial",
      headerName: "Reag .",
      width: 75,
      minWidth: 75,
      maxWidth: 75,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        params.row.ehpresencial === true &&
        params.row.requerreagendamento === true ? (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              backgroundColor: (theme) => theme.colors.success.dark,
            }}
          >
            P
          </Avatar>
        ) : (
          params.row.requerreagendamento === true && (
            <Avatar
              sx={{
                width: 24,
                height: 24,
                backgroundColor: (theme) => theme.colors.info.dark,
              }}
            >
              V
            </Avatar>
          )
        ),
    },
    {
      field: "dataagendamento",
      headerName: "Data agend.",
      width: 135,
      minWidth: 135,
      maxWidth: 135,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        moment(params.value).utc().format("DD/MM/YYYY HH:mm"),
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
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "agtregistro",
      headerName: "Agt. registro",
      width: 140,
      minWidth: 140,
      maxWidth: 140,
      headerAlign: "center",
      valueFormatter: ({ value }) => value.nome,
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      minWidth: 200,
      maxWidth: 200,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "foiemitido",
      headerName: "Emit.",
      width: 75,
      minWidth: 75,
      maxWidth: 75,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        params.value ? (
          <CircleRounded fontSize="small" sx={{ color: "success.dark" }} />
        ) : (
          <CircleRounded fontSize="small" sx={{ color: "error.dark" }} />
        ),
    },
    {
      field: "aprovado",
      headerName: "Aprov.",
      width: 75,
      minWidth: 75,
      maxWidth: 75,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
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
      minWidth: 180,
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => {
        const handleModal = async (name: string) => {
          const rows = params.row;
          return OpenModal(name, rows);
        };

        return (
          <Stack
            direction="row"
            spacing={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            paddingX={2}
            sx={{ width: "100%" }}
          >
            <IconButton aria-label="Detalhes" size="small">
              <Tooltip title="Detalhes" placement="top-start">
                <div>
                  <PendingTwoTone
                    onClick={() => refDetails.current.handleOpenModal()}
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
              (params.row.status === "Confirmado" ||
                params.row.status === "Em vídeo") && (
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
    <Box width="100%" paddingX={2}>
      <DataGrid
        headerHeight={45}
        rowHeight={45}
        getRowId={(row) => row.uid}
        rows={data}
        columns={columns}
        pageSize={10}
        hideFooterSelectedRowCount
        autoHeight
        onCellClick={(e) => {
          setSelectedScheduling(e.row);
        }}
      />

      <CancelScheduling
        uid={selectedScheduling.uid}
        open={cancelOpen}
        setOpen={CloseModal}
        name={selectedScheduling.nome}
      />

      <Reschedule
        open={reScheduleOpen}
        setOpen={CloseModal}
        schedule={selectedScheduling}
      />

      <Details ref={refDetails} schedule={selectedScheduling} />
    </Box>
  );
}
