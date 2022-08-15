import ReactDOM from "react-dom";
import App from "@/presentation/app";

import "nprogress/nprogress.css";
import { SidebarProvider, ReduceMenuProvider } from "@/presentation/hooks";
import * as moment from "moment-timezone";
moment.tz.setDefault("Etc/UTC");

ReactDOM.render(
  <ReduceMenuProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </ReduceMenuProvider>,
  document.getElementById("main")
);
