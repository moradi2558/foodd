import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const UserLoggedInPrivate = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.isLoggedIn === true) {
      navigate("/");
    }
  });
  return authContext.isLoggedIn === false && <> {children} </>;
};

export default UserLoggedInPrivate;
