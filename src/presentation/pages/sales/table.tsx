import { useState } from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetSalesContent } from "@/domain/models";
import { CircleRounded } from "@mui/icons-material";
import { SquareAvatar } from "@/presentation/components/square-avatar";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { HeaderDataGrid } from "@/presentation/ui-components";

export function ListSalesTable({
  data,
  idparceiro,
}: {
  data: GetSalesContent[];
  idparceiro: number;
}) {
  const [selectedSale, setSelectedSale] = useState({} as GetSalesContent);

  const navigation = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "uid",
      headerName: "UID",
      width: 170,
      hide: true,
    },
    {
      field: "voucher",
      headerName: "Voucher",
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "protocolo",
      headerName: "Protocolo",
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "tipocertificado",
      headerName: "Tip. certif.",
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "documento",
      headerName: "CPF/CNPJ",
      width: 130,
      minWidth: 130,
      maxWidth: 130,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "nomecliente",
      headerName: "Cliente",
      width: 250,
      minWidth: 250,
      maxWidth: 250,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "statusagendamento",
      headerName: "Stat. Agend.",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "dataagendamento",
      headerName: "Dt. agend.",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        params.value
          ? moment(params.value).utc().format("DD/MM/YYYY HH:mm")
          : "-",
    },
    {
      field: "foiemitido",
      headerName: "Emit.",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
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
      width: 60,
      minWidth: 60,
      maxWidth: 60,
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
      field: "pago",
      headerName: "Pago",
      width: 50,
      minWidth: 50,
      maxWidth: 50,
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
      minWidth: 70,
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <IconButton
              aria-label="Editar"
              size="small"
              onClick={() =>
                navigation(`/sales/edit/${params.row.uid}`, {
                  state: { sale: { ...params.row, idparceiro } },
                })
              }
            >
              <Tooltip title="Editar" placement="top-start">
                <div>
                  <SquareAvatar backgroundColor={["info", "dark"]}>
                    <EditIcon fontSize="small" />
                  </SquareAvatar>
                </div>
              </Tooltip>
            </IconButton>
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
          setSelectedSale(e.row);
        }}
      />
    </Box>
  );
}
