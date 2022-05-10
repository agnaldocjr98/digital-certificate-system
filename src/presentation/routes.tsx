import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import SidebarLayout from "@/presentation/components/layout/sidebar-layout";
import { Decriptography } from "@/helpers/crypt-decript";
import { Home } from "./pages/home";
import { Status404 } from "./pages/404";

interface MyRoutesProps {
  MakeLogin: React.ReactElement;
  MakeAgentRegisterRegisterScheduling: React.ReactElement;
  MakeAgentRegisterQueryScheduling: React.ReactElement;
  MakeAgentRegisterConfirmedScheduling: React.ReactElement;
  MakeAgentRegisterVideoConference: React.ReactElement;
  MakeAgentRegisterFinishScheduling: React.ReactElement;
}

interface StateRoute {
  operation: number;
}

export const MyRoutes: React.FC<MyRoutesProps> = ({
  MakeLogin,
  MakeAgentRegisterRegisterScheduling,
  MakeAgentRegisterQueryScheduling,
  MakeAgentRegisterConfirmedScheduling,
  MakeAgentRegisterVideoConference,
  MakeAgentRegisterFinishScheduling,
}) => {
  const location = useLocation();
  const stateRoute = location.state as StateRoute;

  function PrivateRoute() {
    const authStorage = localStorage.getItem("identite@isAuthenticated");
    const isAuth = authStorage
      ? Decriptography(authStorage) === "authenticated"
        ? true
        : false
      : false;

    if (isAuth) {
      if (location.pathname === "/home") return <Outlet />;
      if (location.pathname === "/") return <Navigate to="home" />;
      if (location.pathname.includes("/agentvideo/confirm/")) return <Outlet />;
      if (location.pathname.includes("/agentvideo/register/"))
        return <Outlet />;
      if (location.pathname.includes("/agentregister/finishscheduling/"))
        return <Outlet />;
      if (!stateRoute) return <Navigate to="404" />;
      return <Outlet />;
    } else {
      return <Navigate to="login" />;
    }
  }

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<SidebarLayout />} children={<Home />} />
        <Route
          path="/agentregister/toschedule"
          element={<SidebarLayout />}
          children={MakeAgentRegisterRegisterScheduling}
        />
        <Route
          path="/agentregister/queryscheduling"
          element={<SidebarLayout />}
          children={MakeAgentRegisterQueryScheduling}
        />

        <Route
          path="/agentvideo/confirm/:id"
          element={<SidebarLayout />}
          children={MakeAgentRegisterConfirmedScheduling}
        />
        <Route
          path="/agentregister/finishscheduling/:id"
          element={<SidebarLayout />}
          children={MakeAgentRegisterFinishScheduling}
        />
        <Route
          path="/agentvideo/register/:id"
          element={<SidebarLayout />}
          children={MakeAgentRegisterVideoConference}
        />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" replace />} />
      <Route path="/notfound" element={<Status404 />} />
      <Route path="/login" element={MakeLogin} />
    </Routes>
  );
};
