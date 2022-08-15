import React, { useEffect, useState } from "react";
import { Scheduling } from "@/data/entities";
import {
  setVideoConference,
  useVideoConference,
} from "@/presentation/redux/slices/video-conference";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/presentation/redux/slices/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { VideoConferenceCentralizeComponents } from "./centralize-components";
import { Loader } from "@/presentation/components/loader";
import { Stack } from "@mui/material";
import { InnerContent } from "@/presentation/components/inner-content";
import moment from "moment";
import { TableDataClient } from "../table-data-scheduling";

interface VideoConferenceProps {
  uid: string;
  scheduling: Scheduling;
}

export const VideoConference = ({ uid, scheduling }: VideoConferenceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const payload = useSelector(useVideoConference);
  const { tipo } = useSelector(getUserData);

  const navigate = useNavigate();

  async function GetDataScheduling() {
    try {
      setIsLoading(true);
      const response = await scheduling.infoScheduling({
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
              <TableDataClient
                schedulingdate={payload.scheduling?.dataagendamento}
                name={payload.customer?.nome_contato}
                protocol={payload.scheduling?.protocolo}
                typecertificate={payload.scheduling?.tipocertificado}
              />
            </Stack>
          </Stack>
          <VideoConferenceCentralizeComponents />
        </Stack>
      )}
    </InnerContent>
  );
};
