import React from "react";
import SidebarLayout from "@/presentation/components/layout/sidebar-layout";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { Decriptography } from "@/helpers/crypt-decript";
import { Home } from "./pages/home";
import { Status404 } from "./pages/404";
import { Schedules } from "./pages/schedules";
import { Partners } from "./pages/partners";

interface MyRoutesProps {
  MakeLogin: React.ReactElement;
  MakeCreateScheduling: React.ReactElement;
  MakeListSchedulings: React.ReactElement;
  MakeConfirmScheduling: React.ReactElement;
  MakeVideoConference: React.ReactElement;
  MakeFinishScheduling: React.ReactElement;
  MakeUsers: React.ReactElement;
  MakeEditUser: React.ReactElement;
  MakeCreateUser: React.ReactElement;
  MakeDashboards: React.ReactElement;
  MakeCustomers: React.ReactElement;
  MakeEditCustomer: React.ReactElement;
  MakeCreateCustomer: React.ReactElement;
  MakeSales: React.ReactElement;
  MakeCreateSale: React.ReactElement;
  MakeEditSale: React.ReactElement;
}

interface StateRoute {
  operation: number;
}

export const MyRoutes: React.FC<MyRoutesProps> = ({
  MakeLogin,
  MakeCreateScheduling,
  MakeListSchedulings,
  MakeConfirmScheduling,
  MakeVideoConference,
  MakeFinishScheduling,
  MakeUsers,
  MakeEditUser,
  MakeCreateUser,
  MakeDashboards,
  MakeCustomers,
  MakeEditCustomer,
  MakeCreateCustomer,
  MakeSales,
  MakeCreateSale,
  MakeEditSale,
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
          children={MakeCreateScheduling}
        />
        <Route
          path="/identite/queryscheduling"
          element={<SidebarLayout />}
          children={MakeListSchedulings}
        />

        <Route
          path="/agentvideo/confirm/:id"
          element={<SidebarLayout />}
          children={MakeConfirmScheduling}
        />
        <Route
          path="/agentregister/finishscheduling/:id"
          element={<SidebarLayout />}
          children={MakeFinishScheduling}
        />
        <Route
          path="/agentvideo/register/:id"
          element={<SidebarLayout />}
          children={MakeVideoConference}
        />
        <Route
          path="/identite/dashboards"
          element={<SidebarLayout />}
          children={MakeDashboards}
        />
        <Route path="/users" element={<SidebarLayout />} children={MakeUsers} />
        <Route
          path="/users/edit/:id"
          element={<SidebarLayout />}
          children={MakeEditUser}
        />
        <Route
          path="/users/create"
          element={<SidebarLayout />}
          children={MakeCreateUser}
        />
        <Route
          path="/customers"
          element={<SidebarLayout />}
          children={MakeCustomers}
        />
        <Route
          path="/customers/edit/:id"
          element={<SidebarLayout />}
          children={MakeEditCustomer}
        />
        <Route
          path="/customers/create"
          element={<SidebarLayout />}
          children={MakeCreateCustomer}
        />
        <Route path="/sales" element={<SidebarLayout />} children={MakeSales} />
        <Route
          path="/sales/create"
          element={<SidebarLayout />}
          children={MakeCreateSale}
        />
        <Route
          path="/sales/edit/:id"
          element={<SidebarLayout />}
          children={MakeEditSale}
        />
        <Route
          path="/schedules"
          element={<SidebarLayout />}
          children={<Schedules />}
        />
        <Route
          path="/partners"
          element={<SidebarLayout />}
          children={<Partners />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" replace />} />
      <Route path="/notfound" element={<Status404 />} />
      <Route path="/login" element={MakeLogin} />
    </Routes>
  );
};
