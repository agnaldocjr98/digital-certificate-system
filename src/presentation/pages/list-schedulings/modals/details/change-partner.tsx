import React, { useState } from "react";
import {
  Dialog,
  Slide,
  TextField,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TransitionProps } from "@mui/material/transitions";
import { HeaderModal } from "@/presentation/components/header-modal";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { FunctionUpdateScheduling } from "@/presentation/pages/list-schedulings/modals/video-conference/function-update-scheduling";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSchedulings } from "@/presentation/redux/slices/schedulings";
import { GetSchedulesContent, GetSchedulingsContent } from "@/domain/models";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditDetailsProps {
  open: boolean;
  setOpen: () => void;
  data: {
    uid: string;
    partner: string;
    typecertificate: string;
  };
}

export const ChangePartner = ({ open, setOpen, data }) => {
  const [state, setState] = useState({ ...data, isLoading: false });
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  async function handleChangePartner() {
    try {
      const params = {
        parceiro: state.partner,
        tipocertificado: state.typecertificate,
        uid: data.uid,
      };
      setState({ ...state, isLoading: true });

      const response = await FunctionUpdateScheduling(params);

      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }
      const schedulings =
        queryClient.getQueryData<GetSchedulingsContent[]>("schedulings");
      if (schedulings) {
        const newSchedulings = schedulings.map((scheduling) => {
          return scheduling.uid === data.uid
            ? { ...scheduling, ...params }
            : scheduling;
        });
        queryClient.setQueryData("schedulings", newSchedulings);
        toast.success("Registro alterado com sucesso.");
        setTimeout(() => {
          setOpen();
        }, 2000);
      }
    } catch (error) {
      setState({ ...state, isLoading: false });
      toast.error(error.message);
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-describedby="edit-partner-modal"
    >
      <Box
        sx={{
          paddingX: (theme) => theme.spacing(4),
          paddingBottom: (theme) => theme.spacing(4),
        }}
      >
        <HeaderModal
          id="edit-partner-modal"
          title="Edição"
          subtitle="Parceiro & Tipo de certificado"
          SideIcon={<AssignmentIndIcon />}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            id="partner"
            label="Parceiro"
            variant="outlined"
            value={state.partner}
            size="small"
            onChange={(e) => setState({ ...state, partner: e.target.value })}
          />
          <Box sx={{ minWidth: 120, width: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="select-typecertificate">
                Tipo de certificado
              </InputLabel>
              <Select
                labelId="select-typecertificate"
                id="demo-simple-select"
                value={state.typecertificate}
                label="Tipo de certificado"
                size="small"
                onChange={(e) =>
                  setState({ ...state, typecertificate: e.target.value })
                }
              >
                <MenuItem value="e-cpf">e-CPF</MenuItem>
                <MenuItem value="e-cnpj">e-CNPJ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Box display="flex" justifyContent="flex-end" gap={1.5} paddingTop={2}>
          <LoadingButton
            loading={state.isLoading}
            variant="contained"
            onClick={handleChangePartner}
          >
            Gravar
          </LoadingButton>
          <LoadingButton variant="contained" onClick={setOpen}>
            Sair
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
