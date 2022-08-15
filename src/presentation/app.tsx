import { lazy, Suspense } from "react";
import ThemeProvider from "@/presentation/theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { MyRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Toast } from "./components/toast";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "@/presentation/redux/store";
import "react-toastify/dist/ReactToastify.css";
import { FallBack } from "./ui-components/fallback";

const queryClient = new QueryClient();

const Login = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeLogin,
  }))
);

const CreateScheduling = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeCreateScheduling,
  }))
);

const ListSchedulings = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeListSchedulings,
  }))
);

const ConfirmScheduling = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeConfirmScheduling,
  }))
);

const VideoConference = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeVideoConference,
  }))
);

const FinishScheduling = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeFinishScheduling,
  }))
);

const Users = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeUsers,
  }))
);

const EditUser = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeEditUser,
  }))
);

const CreateUser = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeCreateUser,
  }))
);

const Dashboards = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeDashboards,
  }))
);

const Customers = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeCustomers,
  }))
);

const EditCustomer = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeEditCustomer,
  }))
);

const CreateCustomer = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeCreateCustomer,
  }))
);

const Sales = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeSales,
  }))
);

const CreateSale = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeCreateSale,
  }))
);

const EditSale = lazy(() =>
  import("@/main/factories").then((module) => ({
    default: module.MakeEditSale,
  }))
);

const App = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <CssBaseline />
            <BrowserRouter>
              <MyRoutes
                MakeLogin={<Login />}
                MakeCreateScheduling={<CreateScheduling />}
                MakeListSchedulings={<ListSchedulings />}
                MakeConfirmScheduling={<ConfirmScheduling />}
                MakeVideoConference={<VideoConference />}
                MakeFinishScheduling={<FinishScheduling />}
                MakeUsers={<Users />}
                MakeEditUser={<EditUser />}
                MakeCreateUser={<CreateUser />}
                MakeDashboards={<Dashboards />}
                MakeCustomers={<Customers />}
                MakeEditCustomer={<EditCustomer />}
                MakeCreateCustomer={<CreateCustomer />}
                MakeSales={<Sales />}
                MakeCreateSale={<CreateSale />}
                MakeEditSale={<EditSale />}
              />
            </BrowserRouter>

            <Toast />
          </ThemeProvider>
        </Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Suspense>
  );
};
export default App;
