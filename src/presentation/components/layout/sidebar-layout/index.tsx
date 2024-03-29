import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useReduceMenu } from "@/presentation/hooks";
import Sidebar from "./sidebar";
import Header from "./header";

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const { minimized } = useReduceMenu();

  const MainWrapper = styled(Box)(
    ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${minimized ? "75px" : theme.sidebar.width};
        }
`
  );

  const MainContent = styled(Box)(
    ({ theme }) => `
        margin-top: ${theme.header.height};
        margin-bottom: ${theme.spacing(3)};
        flex: 1 1 auto;
        overflow: auto;
        width: 100%;
        height: calc(100vh - (${theme.header.height} + ${theme.spacing(3)}));
`
  );
  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
