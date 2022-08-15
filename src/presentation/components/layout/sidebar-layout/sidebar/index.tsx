import { Scrollbars } from "react-custom-scrollbars-2";
import { useSidebar, useReduceMenu } from "@/presentation/hooks";
import { Box, Drawer, Hidden, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import SidebarMenu from "./sidebar-menu";
import { Logo } from "@/presentation/components/logo";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuIcon from "@mui/icons-material/Menu";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useSidebar();
  const closeSidebar = () => toggleSidebar();

  const { minimized, setMinimized } = useReduceMenu();

  return (
    <>
      <Hidden lgDown>
        <SidebarWrapper style={{ width: minimized && "75px" }}>
          <Scrollbars autoHide>
            <TopSection>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={minimized ? "center" : "space-between"}
                style={{ width: "100%" }}
              >
                {!minimized && <Logo />}
                <IconButton size="small" onClick={() => setMinimized()}>
                  {minimized ? (
                    <MenuIcon color="primary" />
                  ) : (
                    <ArrowBackIosIcon color="primary" />
                  )}
                </IconButton>
              </Stack>
            </TopSection>
            <SidebarMenu />
          </Scrollbars>
        </SidebarWrapper>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
