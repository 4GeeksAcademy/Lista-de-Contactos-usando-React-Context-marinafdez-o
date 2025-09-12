import React, { createContext } from "react";
import useGlobalReducer from "./hooks/useGlobalReducer";

export const Context = createContext(null);

const GlobalProvider = ({ children }) => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <Context.Provider value={{ store, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalProvider;
