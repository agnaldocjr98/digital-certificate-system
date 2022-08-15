import { useState, createContext, useContext } from "react";

interface ReduceMenuContenxtProps {
  minimized: boolean;
  setMinimized(): void;
}

export const ReduceMenuContext = createContext<ReduceMenuContenxtProps>(
  {} as ReduceMenuContenxtProps
);

export const ReduceMenuProvider = ({ children }) => {
  const [minimized, AltMinimized] = useState(true);

  const setMinimized = () => {
    AltMinimized(!minimized);
  };

  return (
    <ReduceMenuContext.Provider value={{ minimized, setMinimized }}>
      {children}
    </ReduceMenuContext.Provider>
  );
};

export function useReduceMenu() {
  const context = useContext(ReduceMenuContext);
  return context;
}
