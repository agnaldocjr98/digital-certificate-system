import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { AxiosHttpAdapter } from "@/infra/http";
import { Scheduling } from "@/data/entities";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import moment from "moment";

interface CancelSchedulingProps {
  open: boolean;
  setOpen: (name: string) => void;
  uid: string;
  name: string;
}
export function CancelScheduling({
  open,
  setOpen,
  uid,
  name,
}: CancelSchedulingProps) {
  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [isLoading, setIsLoading] = useState(false);

  async function cancelProcess() {
    try {
      const httpAdapter = new AxiosHttpAdapter();
      const scheduling = new Scheduling(httpAdapter);

      if (!uid) {
        toast.error("UID não informado!");
        return;
      }

      setIsLoading(true);
      const response = await scheduling.cancel({
        datacancelamento: `${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
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
        aria-labelledby="modal-cancel-identite"
      >
        <DialogTitle id="modal-cancel-identite">IDENTITÉ</DialogTitle>
        <DialogContent>
          <p>
            Deseja mesmo cancelar o agendamento do cliente{" "}
            <strong>{name}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={cancelProcess}
          >
            Cancelar
          </LoadingButton>
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
