import { Stack } from "@mui/material";
import { useFinishScheduling } from "./useFinishScheduling";
import { FinishSchedulingWasApproved } from "./was-approved";
import { FinishSchedulingApprovedDate } from "./approved-date";
import { FinishSchedulingErrorVideoDoc } from "./error-video-doc";

interface CentralizeComponentsProps {
  uid: string;
}
export const CentralizeComponents = ({ uid }: CentralizeComponentsProps) => {
  const { finishScheduling } = useFinishScheduling();

  return (
    <Stack spacing={1.5}>
      {finishScheduling.step >= 0 && <FinishSchedulingWasApproved uid={uid} />}
      {finishScheduling.step > 0 && finishScheduling.approved === "Sim" && (
        <FinishSchedulingApprovedDate />
      )}
      {finishScheduling.step > 0 && finishScheduling.approved === "Não" && (
        <FinishSchedulingErrorVideoDoc />
      )}
    </Stack>
  );
};
