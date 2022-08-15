import { User } from "@/data/entities";
import { HeaderContent } from "@/presentation/components/header-content";
import { InnerContent } from "@/presentation/components/inner-content";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Paper, Stack, Tooltip, Box } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { GetUsersContent } from "@/domain/models";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import { SquareAvatar } from "@/presentation/components/square-avatar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router";
import { CircleRounded } from "@mui/icons-material";
import { Loader } from "@/presentation/components/loader";
import { toast } from "react-toastify";
import { HeaderDataGrid } from "@/presentation/ui-components";

interface ListUsersProps {
  user: User;
}

export const ListUsers = ({ user }: ListUsersProps) => {
  const { data, isFetching } = useQuery<GetUsersContent[]>(
    "users",
    async () => {
      const response = await user.get();
      return response.content;
    },
    {
      staleTime: 1000 * 60 * 5, //5 minutos,
    }
  );

  const queryClient = useQueryClient();

  async function ActiveOrInativeUser(id: number, status: string, name: string) {
    if (
      confirm(
        `Realmente deseja ${
          status === "A" ? "desativar" : "ativar"
        } o usuário ${name}?`
      )
    ) {
      const response = await user.update(id, {
        ativo: status === "A" ? "N" : "S",
      });

      if (!response.success) {
        toast.error(response.errorMessage);
        return;
      }
      const users = queryClient.getQueryData<GetUsersContent[]>("users");
      if (users) {
        const newUsers = users.map((user) => {
          return user.id === id
            ? { ...user, ativo: status === "A" ? "N" : "S" }
            : user;
        });
        queryClient.setQueryData("users", newUsers);
      }
    } else {
      return;
    }
  }

  const navigation = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 170,
      hide: true,
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
      field: "email",
      headerName: "E-mail",
      width: 240,
      minWidth: 240,
      maxWidth: 240,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
    },
    {
      field: "ativo",
      headerName: "Ativo",
      width: 65,
      minWidth: 65,
      maxWidth: 65,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        params.value === "S" ? (
          <CircleRounded fontSize="small" sx={{ color: "success.dark" }} />
        ) : (
          <CircleRounded fontSize="small" sx={{ color: "error.dark" }} />
        ),
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      align: "left",
      headerAlign: "center",
      renderHeader: (params) => (
        <HeaderDataGrid>{params.colDef.headerName}</HeaderDataGrid>
      ),
      renderCell: (params) =>
        params.value === "AR"
          ? "Agente de registro"
          : params.value === "AV"
          ? "Agente de vídeo"
          : params.value === "GE"
          ? "Gestor"
          : params.value === "PA"
          ? "Parceiro"
          : "Desconhecido",
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
        return (
          <Stack
            direction="row"
            spacing={0.5}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            paddingX={2}
            sx={{ width: "100%" }}
          >
            <IconButton
              aria-label="Editar"
              size="small"
              onClick={() =>
                navigation(`/users/edit/${params.row.id}`, {
                  state: { user: params.row },
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
            <IconButton
              size="small"
              onClick={() =>
                ActiveOrInativeUser(
                  params.row.id,
                  params.row.ativo === "S" ? "A" : "I",
                  params.row.nome
                )
              }
            >
              <Tooltip
                title={params.row.ativo === "S" ? "Desativar" : "Ativar"}
                placement="top-start"
              >
                <div>
                  {params.row.ativo === "S" ? (
                    <SquareAvatar backgroundColor={["error", "dark"]}>
                      <DoDisturbRoundedIcon fontSize="small" />
                    </SquareAvatar>
                  ) : (
                    <SquareAvatar backgroundColor={["success", "dark"]}>
                      <ThumbUpAltIcon fontSize="small" />
                    </SquareAvatar>
                  )}
                </div>
              </Tooltip>
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <InnerContent>
      <HeaderContent
        text="Usuários"
        subtext="Listagem de usuários responsáveis por executar tarefas no sistema (Agente de registro, agente de vídeo, Parceiro e gestor)"
        onClickButton={() =>
          navigation("/users/create", {
            state: { page: "identite#createuser" },
          })
        }
        labelButton={data ? (data.length > 0 ? "Adicionar" : "") : ""}
      />
      <Paper elevation={0}>
        {isFetching ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={4}
          >
            <Loader />
          </Box>
        ) : (
          <DataGrid
            headerHeight={45}
            rowHeight={45}
            getRowId={(row) => row.id}
            rows={data}
            columns={columns}
            pageSize={10}
            hideFooterSelectedRowCount
            autoHeight
          />
        )}
      </Paper>
    </InnerContent>
  );
};
