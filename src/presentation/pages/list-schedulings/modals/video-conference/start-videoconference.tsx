import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/video-conference";
import { IdentiteDateTimePicker } from "@/presentation/ui-components";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { toast } from "react-toastify";
import { PaperStep } from "@/presentation/components/paper-step";
import moment from "moment";

interface StartVideoConferenceProps {
  done: boolean;
}
export const StartVideoConference = ({ done }: StartVideoConferenceProps) => {
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
          etapavideo: 1,
          status: "V",
          datainicio: `${moment()
            .add(-3, "h")
            .format("YYYY-MM-DDTHH:mm:ss")}.00Z`,
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
          <span>1 - INICIAR ATENDIMENTO</span>
        </Stack>
      </strong>

      <IdentiteDateTimePicker
        label="Data da confirmação"
        name="dtconfirmation"
        size="small"
        value={moment(payload.scheduling.dataconfirmacao).add(3, "h").toDate()}
        readOnly={true}
      />
      {!done ? (
        <>
          <span>
            A data de inicio do atendimento será gravada ao clicar em "PRÓXIMO"
          </span>
          <Box>
            <LoadingButton
              variant="contained"
              onClick={persistStep}
              loading={isLoading}
            >
              Próximo
            </LoadingButton>
          </Box>
        </>
      ) : (
        <span>
          Atendimento iniciado as{" "}
          <strong>
            {payload.scheduling
              ? moment(payload.scheduling.datainicio).format(
                  "DD/MM/YYYY  HH:mm:ss"
                )
              : ""}
          </strong>
        </span>
      )}
    </PaperStep>
  );
};
