import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { CalledClient } from "./called-client";
import { ConfirmedClient } from "./confirmed-client";
import { ReconfirmedClient } from "./reconfirmed-client";
import { Tool } from "./tool";
import { useConfirmScheduling } from "./useConfirmScheduling";

interface CentralizeComponentsProps {
  uid: string;
}
export const CentralizeComponents = ({ uid }: CentralizeComponentsProps) => {
  const { getData } = useConfirmScheduling();
  const navigate = useNavigate();
  return (
    <Stack spacing={1.5}>
      {getData.persisted ? (
        <Stack justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            onClick={() => navigate(`/agentvideo/register/${uid}`)}
          >
            Iniciar Vídeo
          </Button>
        </Stack>
      ) : (
        <>
          <ConfirmedClient uid={uid} />
          <Tool />
          <CalledClient />
          <ReconfirmedClient />
        </>
      )}
    </Stack>
  );
};
