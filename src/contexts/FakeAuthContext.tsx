import React, { createContext, ReactNode, useContext, useReducer } from "react";
// import { AuthContextDataType } from "../pages/LogIn/LogIn";

interface authContextProps {
  children: ReactNode;
}
interface authDataProps {
  user: null | object;
  isAuthenticated: boolean;
  error: string;
}
interface reducerActionType {
  type: string;
  payload?: any;
}

const TEST_USER = {
  name: "abdurahman",
  email: "abdu@gmail.com",
  password: "12345",
  avatar: "https://i.pravatar.cc/100?u=uu",
};

export type ContextTypes = {
  logIn?: (x: string, y: string) => void;
  logOut?: () => void;
  user?: any;
  isAuthenticated?: boolean;
  error?: string;
};

const AuthContext = createContext<ContextTypes>({});

const initialData = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state: authDataProps, action: reducerActionType) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unexpected action");
  }
}

function AuthProvider({ children }: authContextProps) {
  const [contextData, dispatch] = useReducer(reducer, initialData);
  const { user, isAuthenticated, error } = contextData;

  function logIn(email: string, password: string) {
    dispatch({ type: "error", payload: "" });

    if (email === TEST_USER.email && password === TEST_USER.password) {
      dispatch({ type: "login", payload: TEST_USER });
      return;
    } else
      dispatch({ type: "error", payload: "⛔ Incorrect Details, Try Again" });
    console.log("Incorrect details");
  }

  function logOut() {
    dispatch({ type: "logout" });
    return;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, logIn, logOut, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider!");
  return context;
}

export { AuthProvider, useAuth };
