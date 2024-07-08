import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedInBase} from "../../redux/auth/selectors";

interface RestrictedRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const RestrictedRoute = ({component: Component, redirectTo = "/"}: RestrictedRouteProps) => {
  const isLoggedInBase = useSelector(selectIsLoggedInBase);

  return isLoggedInBase ? <Navigate to={redirectTo}/> : Component;
};