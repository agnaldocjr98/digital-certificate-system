import React, { useEffect, useState } from "react";
import { AgentRegisterQueryScheduling } from "@/data/usecases";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/videoConferenceSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import moment from "moment";
import { VideoConferenceCentralizeComponents } from "./centralize-components";
import { Loader } from "@/presentation/ui-components/loader";
import { Stack } from "@mui/material";
import { InnerContent } from "@/presentation/components/inner-content";

interface VideoConferenceProps {
  uid: string;
  AgentRegisterQueryScheduling: AgentRegisterQueryScheduling;
}

export const VideoConference = ({
  uid,
  AgentRegisterQueryScheduling,
}: VideoConferenceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { tipo } = useSelector(getUserData);
  const payload = useSelector(useVideoConference);

  const navigate = useNavigate();

  async function GetDataScheduling() {
    try {
      setIsLoading(true);
      const response = await AgentRegisterQueryScheduling.getInfoClient({
        uid,
      });
      if (!response.success) {
        toast.error(response.errorMessage);
        document.title = "Cliente não encontrado!";
        setTimeout(() => {
          navigate("/notfound");
        }, 1500);
        return;
      }

      document.title = `${moment(
        response.content.scheduling.dataagendamento
      ).format("DD/MM HH:mm:ss")} - ${response.content.customer.nome_contato}`;
      dispatch(setVideoConference(response.content));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!(tipo === "AV" || tipo === "GE")) {
      navigate("/notfound");
      return;
    }
    GetDataScheduling();
  }, []);

  return (
    <InnerContent>
      {isLoading ? (
        <Loader />
      ) : (
        <Stack spacing={2}>
          <Stack spacing={1.5}>
            <Stack
              spacing={{ xs: 1, md: 3 }}
              direction={{ xs: "column", md: "row" }}
            >
              <span>
                Data de agendamento:{" "}
                <strong>
                  {" "}
                  {payload.scheduling
                    ? moment(payload.scheduling.dataagendamento).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )
                    : ""}
                </strong>
              </span>
              <span>
                Nome:{" "}
                <strong>
                  {payload.customer ? payload.customer.nome_contato : ""}
                </strong>
              </span>
            </Stack>
            <Stack
              spacing={{ xs: 1, md: 3 }}
              direction={{ xs: "column", md: "row" }}
            >
              <span>
                Protocolo:{" "}
                <strong>
                  {payload.scheduling ? payload.scheduling.protocolo : ""}
                </strong>
              </span>
              <span>
                Tipo de certificado:{" "}
                <strong>
                  {payload.scheduling ? payload.scheduling.tipocertificado : ""}
                </strong>
              </span>
            </Stack>
          </Stack>
          <VideoConferenceCentralizeComponents />
        </Stack>
      )}
    </InnerContent>
  );
};
