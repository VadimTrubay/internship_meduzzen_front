import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {RestrictedRouteProps} from "../../types/routePropsTypes";


export const RestrictedRoute = ({component: Component, redirectTo = "/"}: RestrictedRouteProps) => {
  const [isLoggedIn] = useState<boolean>(false);

  return isLoggedIn ? <Navigate to={redirectTo}/> : Component;
};