import { useState } from "react";
import { FormControlLabel, Stack, Radio, RadioGroup } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Loader } from "@/presentation/ui-components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/videoConferenceSlice";
import { GetInfoClientsContent } from "@/domain/models/model-get-info-client";
import { FunctionUpdateScheduling } from "./function-update-scheduling";
import { toast } from "react-toastify";
import { UpdateSchedulingParams } from "@/domain/usecases";
import { PaperStep } from "@/presentation/components/paper-step";

interface TypeRescheduleProps {
  done: boolean;
}

export const TypeReschedule = ({ done }: TypeRescheduleProps) => {
  const payload = useSelector(useVideoConference);
  const dispatch = useDispatch();

  var typeReschedule = "";

  if (payload.scheduling) {
    if (payload.scheduling.requerreagendamento === true) {
      typeReschedule = "VD";
    } else if (payload.scheduling.ehpresencial === true) {
      typeReschedule = "PR";
    }
  }

  const [state, setState] = useState({
    isLoading: false,
    typeReschedule: typeReschedule,
  });

  async function persistStep(value: string) {
    try {
      setState({ ...state, isLoading: true });
      const params: GetInfoClientsContent = {
        ...payload,
        scheduling: {
          ...payload.scheduling,
          etapavideo: 5,
          requerreagendamento: true,
          ehpresencial: value === "PR" ? true : false,
        },
      };

      const response = await FunctionUpdateScheduling(
        params.scheduling as UpdateSchedulingParams
      );

      if (!response.success) {
        setState({ ...state, isLoading: false });
        toast.error(response.errorMessage);
        return;
      }

      setState({ ...state, typeReschedule: value });
      dispatch(setVideoConference(params));
    } catch (error) {
      setState({ ...state, isLoading: false });
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
          <span>5 - TIPO DE REAGENDAMENTO?</span>
        </Stack>
      </strong>
      <RadioGroup
        row
        aria-labelledby="radiotypereschedule"
        defaultValue=""
        value={state.typeReschedule}
        name="radiotypereschedule"
        onChange={(e) => persistStep(e.target.value)}
      >
        <FormControlLabel
          value="VD"
          control={<Radio />}
          label="Videoconferência"
        />
        <FormControlLabel value="PR" control={<Radio />} label="Presencial" />
      </RadioGroup>
      {state.isLoading && <Loader />}
    </PaperStep>
  );
};
