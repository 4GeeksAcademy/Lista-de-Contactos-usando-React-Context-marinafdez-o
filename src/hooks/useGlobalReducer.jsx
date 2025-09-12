import { useReducer } from "react";

const initialState = {
  // espacio para estado global si lo necesitas
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default function useGlobalReducer() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return { store, dispatch };
}
