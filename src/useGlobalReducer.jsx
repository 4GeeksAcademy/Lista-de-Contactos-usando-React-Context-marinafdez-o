import { useReducer } from "react";

const initialState = {
  contacts: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };

    default:
      return state;
  }
};

const useGlobalReducer = () => useReducer(reducer, initialState);

export default useGlobalReducer;
