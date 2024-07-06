import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {PrivateRouteProps} from "../../types/routePropsTypes";


export const PrivateRoute = ({component: Component, redirectTo = "/login"}: PrivateRouteProps) => {
  const [isLoggedIn] = useState<boolean>(false);

  return isLoggedIn ? Component : <Navigate to={redirectTo}/>;
};
