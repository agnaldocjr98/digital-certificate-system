import ReactDOM from "react-dom";
import App from "@/presentation/app";

import "nprogress/nprogress.css";
import { SidebarProvider } from "@/presentation/hooks/useSidebar";
import * as moment from "moment-timezone";
moment.tz.setDefault("Etc/UTC");

ReactDOM.render(
  <SidebarProvider>
    <App />
  </SidebarProvider>,
  document.getElementById("main")
);
