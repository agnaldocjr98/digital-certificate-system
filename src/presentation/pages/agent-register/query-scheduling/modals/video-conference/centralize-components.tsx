import { useVideoConference } from "@/presentation/redux/slices/videoConferenceSlice";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { ClientEnterCall } from "./client-enter-call";
import { StartVideoConference } from "./start-videoconference";
import { EndVideoConference } from "./end-videoconference";
import { WasIssued } from "./was-issued";
import { TypeReschedule } from "./type-reschedule";
import { HavePendencies } from "./have-pendencies";

export const VideoConferenceCentralizeComponents = () => {
  const { customer, scheduling } = useSelector(useVideoConference);

  var step: number;
  if (scheduling) {
    if (!scheduling.etapavideo) {
      step = 0;
    } else {
      step = scheduling.etapavideo;
    }
  }

  return (
    <Stack spacing={2}>
      {step >= 0 && <StartVideoConference done={step > 0} />}
      {step > 0 && <ClientEnterCall done={step > 1} />}

      {step > 1 && scheduling.clientepresente && (
        <EndVideoConference done={step > 2} />
      )}

      {step > 2 && <WasIssued done={step > 3} />}
      {step > 3 && !scheduling.foiemitido && <TypeReschedule done={step > 4} />}
      {step > 4 && <HavePendencies done={step > 5} />}
    </Stack>
  );
};
