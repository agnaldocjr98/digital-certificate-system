import { FinishScheduling } from "@/presentation/pages/list-schedulings/modals/finish-scheduling";
import { Scheduling } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { useParams } from "react-router";

export const MakeFinishScheduling = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);
  const { id } = useParams();
  return <FinishScheduling uid={id} scheduling={scheduling} />;
};
