import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import {
  Box,
  Theme,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GetPartnersContent, intervals } from "@/domain/models";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRegisterScheduling } from "@/presentation/redux/slices/register-scheduling";
import { Partner, Scheduling } from "@/data/entities";
import { getUserData } from "@/presentation/redux/slices/user";
import { LoadingButton } from "@mui/lab";
import { CreateSchedulingParams } from "@/domain/usecases";
import { HeaderListScheduling } from "./list-items";
import { HeaderDataGrid } from "@/presentation/ui-components";
import { AxiosHttpAdapter } from "@/infra/http";

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
      width: "400px",
    },
  },
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "idschedule", headerName: "Schedule ID", hide: true },
  {
    field: "icon",
    headerName: "",
    width: 40,
    renderCell: () => <DateRangeIcon />,
  },
  {
    field: "datetimestart",
    headerName: "Data Inicial",
    maxWidth: 150,
    minWidth: 150,
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
    ),
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "datetimeend",
    headerName: "Data Final",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderHeader: (params) => (
      <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
    ),
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
  },
];

interface CreateSchedulingProps {
  intervals: intervals[];
  scheduling: Scheduling;
}

export default function CreateScheduling({
  intervals,
  scheduling,
}: CreateSchedulingProps) {
  const { currentClient } = useSelector(useRegisterScheduling);
  const userData = useSelector(getUserData);

  const [state, setState] = useState({
    isLoading: false,
    isLoadingRegisterScheduling: false,
    type: currentClient.tipocertificado.toLowerCase(),
    partner: currentClient.parceiro,
    idpartner: currentClient.idparceiro,
    protocol: "",
    scheduleName: "",
    scheduleId: -1,
    paymentProtocol: "",
    selectedSchedules: {
      initialDate: null,
      finalDate: null,
    },
  });
  const [partners, setPartners] = useState([] as GetPartnersContent[]);

  const partnerReadOnly =
    currentClient.idparceiro &&
    currentClient.idparceiro > 0 &&
    !!currentClient.parceiro;

  async function GetPartners() {
    const httpClient = new AxiosHttpAdapter();
    const partner = new Partner(httpClient);
    const response = await partner.get();
    if (!response.success) {
      toast.error(response.errorMessage);
      return;
    }
    if (response.content.length === 0) {
      toast.error("Nenhum parceiro encontrado!");
      return;
    }

    setPartners(response.content);
  }

  useEffect(() => {
    const partnerReadOnly =
      currentClient.idparceiro &&
      currentClient.idparceiro > 0 &&
      !!currentClient.parceiro;
    if (!partnerReadOnly) {
      GetPartners().catch((error) =>
        toast.error("message" in error ? error.message : error)
      );
    }
  }, []);

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

      const params: CreateSchedulingParams = {
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
        idparceiro: state.idpartner,
      };
      setState({ ...state, isLoadingRegisterScheduling: true });
      const response = await scheduling.create(params);
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
    <Stack
      display="flex"
      direction={{ xs: "column", md: "row" }}
      height={{ xs: "auto", sm: "400px" }}
      gap={2}
    >
      <Box height={400} width={{ sm: "100%", md: "380px" }}>
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
          pageSize={5}
          hideFooterSelectedRowCount
        />
      </Box>

      <Stack spacing={1.5} mt={1} width={{ xs: "100%", md: 250 }}>
        {currentClient.tipocertificado.toLowerCase() === "e-cpf" ||
        currentClient.tipocertificado.toLowerCase() === "e-cnpj" ? (
          <TextField
            value={state.type}
            size="small"
            id="tipocertificado"
            label="Tipo de certificado"
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        ) : (
          <FormControl fullWidth>
            <InputLabel id="select-type-certificate">
              Tipo de certificado
            </InputLabel>
            <Select
              size="small"
              labelId="select-type-certificate"
              id="select-type-certificate"
              value={state.type}
              label="Tipo de certificado"
              onChange={(e) => setState({ ...state, type: e.target.value })}
            >
              <MenuItem value="e-cpf">e-CPF</MenuItem>
              <MenuItem value="e-cnpj">e-CNPJ</MenuItem>
            </Select>
          </FormControl>
        )}

        {partnerReadOnly ? (
          <TextField
            value={state.partner}
            size="small"
            id="Parceiro"
            label="Parceiro"
            variant="outlined"
            inputProps={{ readOnly: true }}
          />
        ) : (
          <FormControl fullWidth>
            <InputLabel id="partner">* Parceiro</InputLabel>
            <Select
              size="small"
              value={state.idpartner || ""}
              labelId="partner"
              id="partner"
              fullWidth
              label="* Parceiro"
              onChange={(e) =>
                setState({
                  ...state,
                  idpartner: e.target.value as number,
                  partner: partners.find((ptn) => ptn.id === e.target.value)
                    .nomerazaosocial,
                })
              }
            >
              {partners.map((partner) => {
                return (
                  <MenuItem value={partner.id} key={partner.id}>
                    <strong>{partner.nomerazaosocial}</strong>
                    {" - "} {partner.cpfcnpj}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

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
        <Stack
          display="flex"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={1.5}
        >
          <LoadingButton
            variant="contained"
            // onClick={handlePostScheduling}
            // loading={state.isLoadingRegisterScheduling}
            onClick={() => alert("Rotina em desenvolvimento!")}
          >
            Buscar protocolo
          </LoadingButton>
          <LoadingButton
            variant="contained"
            onClick={handlePostScheduling}
            loading={state.isLoadingRegisterScheduling}
          >
            Agendar
          </LoadingButton>
        </Stack>
      </Stack>

      {state.scheduleName && (
        <HeaderListScheduling
          client={currentClient.nome}
          schedule={state.scheduleName}
          dates={[
            moment(state.selectedSchedules.initialDate)
              .utc()
              .format("DD/MM/YYYY"),
            moment(state.selectedSchedules.finalDate)
              .utc()
              .format("DD/MM/YYYY"),
          ]}
          hours={[
            moment(state.selectedSchedules.initialDate)
              .utc()
              .format("HH:mm:ss"),
            moment(state.selectedSchedules.finalDate).utc().format("HH:mm:ss"),
          ]}
        />
      )}
    </Stack>
  );
}
