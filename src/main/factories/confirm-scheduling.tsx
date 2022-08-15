import { ConfirmScheduling } from "@/presentation/pages/list-schedulings/modals/confirm-scheduling";
import { Scheduling } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { useParams } from "react-router";

export const MakeConfirmScheduling = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);
  const { id } = useParams();
  return <ConfirmScheduling uid={id} scheduling={scheduling} />;
};
