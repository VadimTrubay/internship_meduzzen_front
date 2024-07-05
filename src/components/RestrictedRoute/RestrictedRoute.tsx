import React, {useState} from "react";
import {Navigate} from "react-router-dom";

interface RestrictedRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const RestrictedRoute = ({component: Component, redirectTo = "/"}: RestrictedRouteProps) => {
  const [isLoggedIn] = useState<boolean>(false);

  return isLoggedIn ? <Navigate to={redirectTo}/> : Component;
};