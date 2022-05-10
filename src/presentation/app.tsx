import {
  MakeLogin,
  MakeAgentRegisterRegisterScheduling,
  MakeAgentRegisterQueryScheduling,
  MakeAgentRegisterConfirmedScheduling,
  MakeAgentRegisterVideoConference,
  MakeAgentRegisterFinishScheduling,
} from "@/main/factories";
import ThemeProvider from "@/presentation/theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { MyRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Toast } from "./ui-components/toast";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/presentation/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <MyRoutes
            MakeLogin={<MakeLogin />}
            MakeAgentRegisterRegisterScheduling={
              <MakeAgentRegisterRegisterScheduling />
            }
            MakeAgentRegisterQueryScheduling={
              <MakeAgentRegisterQueryScheduling />
            }
            MakeAgentRegisterConfirmedScheduling={
              <MakeAgentRegisterConfirmedScheduling />
            }
            MakeAgentRegisterVideoConference={
              <MakeAgentRegisterVideoConference />
            }
            MakeAgentRegisterFinishScheduling={
              <MakeAgentRegisterFinishScheduling />
            }
          />
        </BrowserRouter>

        <Toast />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
