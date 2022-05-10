import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AxiosHttpAdapter } from "@/infra/http";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import { toast } from "react-toastify";
import moment from "moment";

interface AgentRegisterQuerySchedulingCancelsProcessProps {
  open: boolean;
  setOpen: (name: string) => void;
  uid: string;
  name: string;
}
export function AgentRegisterQuerySchedulingCancelProcess({
  open,
  setOpen,
  uid,
  name,
}: AgentRegisterQuerySchedulingCancelsProcessProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

  async function cancelProcess() {
    try {
      const axios = new AxiosHttpAdapter();
      const AgentRegisterQuerySchedulingInstance =
        new AgentRegisterQueryScheduling(axios);

      if (!uid) {
        toast.error("UID não informado!");
        return;
      }

      setIsLoading(true);
      const response =
        await AgentRegisterQuerySchedulingInstance.cancelScheduling({
          datacancelamento: `${moment()
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
          uid: uid,
        });
      if (!response.success) {
        setIsLoading(false);
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      toast.success("Agendamento cancelado com sucesso");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="lg"
        onClose={() => setOpen("cancelOpen")}
        aria-labelledby="modal-cancel-certificate-system"
      >
        <DialogTitle id="modal-cancel-certificate-system">
          CERTIFICATE SYSTEM
        </DialogTitle>
        <DialogContent>
          <p>
            Deseja mesmo cancelar o agendamento do cliente{" "}
            <strong>{name}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="error"
            variant="contained"
            onClick={cancelProcess}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => setOpen("cancelOpen")}
            autoFocus
            variant="contained"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
