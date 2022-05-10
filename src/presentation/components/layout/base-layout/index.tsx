import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <>{children || <Outlet />}</>;
};

export default BaseLayout;
