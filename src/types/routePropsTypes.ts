import React from "react";

export interface RestrictedRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}


export interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}