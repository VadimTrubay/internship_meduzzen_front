import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {LoginButtonAuth0} from "./LoginButtonAuth0/LoginButtonAuth0";
import UserMenuAuth0 from "../UserMenuAuth0/UserMenuAuth0";


const AuthNavAuth0: React.FC = () => {
  const {isAuthenticated} = useAuth0()

  return isAuthenticated ? <UserMenuAuth0/> : <LoginButtonAuth0/>
};

export default AuthNavAuth0;
