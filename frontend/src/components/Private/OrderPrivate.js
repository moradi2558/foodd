import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const OrderPrivate = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.cart.cart.length == 0) {
      navigate("/");
    }
  }, []);
  return authContext.cart.cart.length !== 0 && <> {children}</>;
};

export default OrderPrivate;
