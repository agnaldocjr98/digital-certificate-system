import { useState } from "react";
import { Paper, Stack, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/videoConferenceSlice";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { UpdateSchedulingParams } from "@/domain/usecases";
import moment from "moment";
import { toast } from "react-toastify";
import { PaperStep } from "@/presentation/components/paper-step";

interface StartVideoConferenceProps {
  done: boolean;
}
export const EndVideoConference = ({ done }: StartVideoConferenceProps) => {
  const payload = useSelector(useVideoConference);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function persistStep() {
    try {
      setIsLoading(true);
      const params = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          etapavideo: 3,
          datafim: `${moment().add(-3, "h").format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
        },
      };

      const response = await FunctionUpdateScheduling(
        params.scheduling as UpdateSchedulingParams
      );

      if (!response.success) {
        setIsLoading(false);
        toast.error(response.errorMessage);
        return;
      }
      setIsLoading(false);
      dispatch(setVideoConference(params));
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <PaperStep done={done}>
      <strong>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <DoubleArrowIcon />
          <span>3 - ENCERRAR ATENDIMENTO</span>
        </Stack>
      </strong>
      {!done ? (
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={persistStep}
        >
          Encerrar
        </LoadingButton>
      ) : (
        <span>
          Atendimento encerrado as{" "}
          <strong>
            {payload.scheduling
              ? moment(payload.scheduling.datafim).format(
                  "DD/MM/YYYY  HH:mm:ss"
                )
              : ""}
          </strong>
        </span>
      )}
    </PaperStep>
  );
};
