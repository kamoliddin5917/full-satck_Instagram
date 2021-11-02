import { Route, Redirect, useLocation } from "react-router-dom";

import useAuth from "../hooks/UseAuth";

const Public = (props) => {
  const [token] = useAuth();
  const { pathname } = useLocation();

  if (token !== "false" && token && (pathname === "/login" || pathname === "/signup")) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default Public;
