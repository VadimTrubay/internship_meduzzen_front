import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";

interface RestrictedRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const RestrictedRoute = ({component: Component, redirectTo = "/"}: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo}/> : Component;
};