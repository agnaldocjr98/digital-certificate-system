import { FC, useState, createContext, useContext } from "react";
interface SidebarContext {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export function useSidebar() {
  const context = useContext(SidebarContext);
  return context;
}
