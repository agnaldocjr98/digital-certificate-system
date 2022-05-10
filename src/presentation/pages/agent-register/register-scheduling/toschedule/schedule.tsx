import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import { Box, Theme, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { intervals } from "@/domain/models";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRegisterScheduling } from "@/presentation/redux/slices/registerSchedulingSlice";
import { AxiosHttpAdapter } from "@/infra/http";
import { AgentRegisterRegisterScheduling } from "@/data/usecases";
import { RegisterSchedulingParams } from "@/domain/usecases";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  maincontainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
    width: "100%",
    gap: theme.spacing(2),
  },
  tablecontainer: {
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  fieldscontainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "idschedule", headerName: "Schedule ID", hide: true },
  {
    field: "icon",
    headerName: "",
    width: 50,
    renderCell: () => <DateRangeIcon />,
  },
  {
    field: "datetimestart",
    headerName: "Data Inicial",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "datetimeend",
    headerName: "Data Final",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
  },
];

interface Props {
  intervals: intervals[];
}

export default function AgentRegisterToScheduleSchedules({ intervals }: Props) {
  const httpClient = new AxiosHttpAdapter();
  const postSchedulingClass = new AgentRegisterRegisterScheduling(httpClient);

  const { currentClient } = useSelector(useRegisterScheduling);
  const userData = useSelector(getUserData);

  const classes = useStyles();
  const [state, setState] = useState({
    isLoading: false,
    isLoadingRegisterScheduling: false,
    type:
      currentClient.cpfcnpj.length > 11
        ? "e-CNPJ"
        : currentClient.cpfcnpj.length === 11
        ? "e-CPF"
        : "Tipo não encontrado",
    partner: currentClient.parceiro,
    protocol: "",
    scheduleName: "",
    scheduleId: -1,
    paymentProtocol: "",
    selectedSchedules: {
      initialDate: null,
      finalDate: null,
    },
  });

  function changeState(name: string, value: string) {
    setState({ ...state, [name]: value });
  }

  const handlePostScheduling = async () => {
    try {
      if (state.type.indexOf("e-") === -1) {
        toast.error("Tipo de certificado inválido!");
        return;
      }
      if (state.scheduleId === -1) {
        toast.error("Selecione um intervalo de data!");
        return;
      }
      if (!state.type) {
        toast.error("Informe o tipo de certificado!");
        return;
      }
      if (!state.partner) {
        toast.error('o campo "Parceiro" é obrigatório!');
        return;
      }
      if (!state.protocol) {
        toast.error('o campo "Protocolo" é obrigatório!');
        return;
      }

      const params: RegisterSchedulingParams = {
        clienteblip: currentClient.clienteblip,
        cpfcnpj: currentClient.cpfcnpj,
        dataagendamento: `${moment(state.selectedSchedules.initialDate)
          .utc()
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
        datacadastro: `${moment()
          .add(-3, "h")
          .format("YYYY-MM-DDTHH:mm")}:00.00Z`,
        email: currentClient.email,
        id: currentClient.id,
        idagenda: state.scheduleId,
        idagtregistro: userData.id,
        nome: currentClient.nome,
        parceiro: state.partner,
        protocolo: state.protocol,
        protocolopagamento: state.paymentProtocol,
        telefone: currentClient.telefone,
        tipocertificado: state.type,
        status: "C",
      };
      setState({ ...state, isLoadingRegisterScheduling: true });
      const response = await postSchedulingClass.RegisterScheduling(params);
      if (!response.success) {
        setState({ ...state, isLoadingRegisterScheduling: false });
        toast.error(response.errorMessage);
        return;
      }
      toast.success("Agendamento realizado com sucesso!");
      window.location.reload();
    } catch (error) {
      setState({ ...state, isLoadingRegisterScheduling: false });
      toast.error(error.message);
      return;
    }
  };

  return (
    <Box className={classes.maincontainer}>
      <Box className={classes.tablecontainer}>
        <DataGrid
          onRowClick={(e) =>
            setState({
              ...state,
              scheduleName: e.row.schedule,
              scheduleId: e.row.idschedule,
              selectedSchedules: {
                ...state.selectedSchedules,
                initialDate: e.row.datetimestart,
                finalDate: e.row.datetimeend,
              },
            })
          }
          rows={intervals}
          columns={columns}
          pageSize={10}
          hideFooterSelectedRowCount
        />
      </Box>

      <Box className={classes.fieldscontainer}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            {!!currentClient.nome && (
              <span>
                CLIENTE: <strong>{currentClient.nome}</strong>
              </span>
            )}
            {!!state.scheduleName && (
              <span>
                AGENDA:<strong> {state.scheduleName}</strong>
              </span>
            )}
          </Stack>
          {state.selectedSchedules.initialDate && (
            <u>
              <span>
                {moment(state.selectedSchedules.initialDate)
                  .utc()
                  .format("DD/MM/YYYY")}{" "}
                <strong style={{ fontSize: "17px" }}>
                  {moment(state.selectedSchedules.initialDate)
                    .utc()
                    .format("HH:mm:ss")}
                </strong>
                {" a "}
                {moment(state.selectedSchedules.finalDate)
                  .utc()
                  .format("DD/MM/YYYY")}{" "}
                <strong style={{ fontSize: "17px" }}>
                  {moment(state.selectedSchedules.finalDate)
                    .utc()
                    .format("HH:mm:ss")}
                </strong>
              </span>
            </u>
          )}
        </Stack>
        <Box sx={{ width: "100%", marginTop: (theme) => theme.spacing(2) }}>
          <Stack spacing={1.5}>
            <TextField
              value={state.type}
              size="small"
              id="tipocertificado"
              label="Tipo de certificado"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              value={state.partner}
              size="small"
              id="Parceiro"
              label="Parceiro"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeState("partner", e.target.value)
              }
            />
            <TextField
              value={state.protocol}
              size="small"
              id="Protocolo"
              label="Protocolo"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeState("protocol", e.target.value)
              }
            />
            <TextField
              value={state.paymentProtocol}
              size="small"
              id="Protocolo de pagamento"
              label="Protocolo de pagamento"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeState("paymentProtocol", e.target.value)
              }
            />
            <LoadingButton
              variant="contained"
              onClick={handlePostScheduling}
              loading={state.isLoadingRegisterScheduling}
            >
              Agendar
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
