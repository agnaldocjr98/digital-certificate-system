import React from "react";
import { Dashboards } from "@/presentation/pages/dashboards";
import { Dashboard } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";

export const MakeDashboards: React.FC = () => {
  const httpAdapter = new AxiosHttpAdapter();
  const dashboard = new Dashboard(httpAdapter);

  return <Dashboards dashboard={dashboard} />;
};
