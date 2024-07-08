import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedInBase} from "../../redux/auth/selectors";


interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({component: Component, redirectTo = "/login"}: PrivateRouteProps) => {
  const isLoggedInBase = useSelector(selectIsLoggedInBase);

  return isLoggedInBase ? Component : <Navigate to={redirectTo}/>;
};