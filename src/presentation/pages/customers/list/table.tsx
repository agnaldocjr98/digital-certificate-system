import { useState } from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetCustomersContent } from "@/domain/models";
import PendingIcon from "@mui/icons-material/Pending";
import { SquareAvatar } from "@/presentation/components/square-avatar";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

import { HeaderDataGrid } from "@/presentation/ui-components";
import { CustomerDetails } from "./details";

export function ListCustomersTable({
  customers,
}: {
  customers: GetCustomersContent[];
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(
    {} as GetCustomersContent
  );
  const [edit, setEdit] = useState(false);

  const navigation = useNavigate();

  function handleToggleModal() {
    setEdit(!edit);
  }

  const columns: GridColDef[] = [
    {
      field: "uid",
      headerName: "UID",
      width: 170,
      hide: true,
    },
    {
      field: "telefone",
      headerName: "Telefone",
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
      field: "nome_contato",
      headerName: "Nome",
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "id",
      headerName: "Id.",
      width: 130,
      minWidth: 130,
      maxWidth: 130,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
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
      field: "menu",
      headerName: "Tipo Certif.",
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
      field: "parceiro",
      headerName: "Parceiro",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,
      minWidth: 180,
      maxWidth: 180,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
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
            spacing={0.5}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <IconButton
              aria-label="Detalhes"
              size="small"
              onClick={handleToggleModal}
            >
              <Tooltip title="Detalhes" placement="top-start">
                <div>
                  <SquareAvatar backgroundColor={["primary", "dark"]}>
                    <PendingIcon fontSize="small" />
                  </SquareAvatar>
                </div>
              </Tooltip>
            </IconButton>

            <IconButton
              aria-label="Editar"
              size="small"
              onClick={() =>
                navigation(`/customers/edit/${params.row.uid}`, {
                  state: { customerparams: params.row },
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
        rows={customers}
        columns={columns}
        pageSize={10}
        hideFooterSelectedRowCount
        autoHeight
        onCellClick={(e) => {
          setSelectedCustomer(e.row);
        }}
      />
      {edit && (
        <CustomerDetails
          customer={selectedCustomer}
          open={edit}
          toggleModal={handleToggleModal}
        />
      )}
    </Box>
  );
}
