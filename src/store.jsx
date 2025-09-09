import { createContext } from "react";
import useGlobalReducer from "./useGlobalReducer";

export const Context = createContext();

export const GlobalProvider = ({ children }) => {
  const [store, dispatch] = useGlobalReducer();

  return (
    <Context.Provider value={{ store, dispatch }}>
      {children}
    </Context.Provider>
  );
};
