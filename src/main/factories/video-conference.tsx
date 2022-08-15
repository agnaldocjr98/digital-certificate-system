import React from "react";
import { VideoConference } from "@/presentation/pages/list-schedulings/modals/video-conference";
import { Scheduling } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { useParams } from "react-router";

export const MakeVideoConference = () => {
  const axiosHttpClient = new AxiosHttpAdapter();
  const scheduling = new Scheduling(axiosHttpClient);
  const { id } = useParams();
  return <VideoConference uid={id} scheduling={scheduling} />;
};
