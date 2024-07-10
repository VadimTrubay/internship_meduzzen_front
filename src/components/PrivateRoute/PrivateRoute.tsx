import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";


interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({component: Component, redirectTo = "/login"}: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo}/>;
};