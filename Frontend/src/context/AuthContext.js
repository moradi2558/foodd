import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  cart: null,
  login: () => {},
  logout: () => {},
  getCartUser: () => {},
});

export default AuthContext;
