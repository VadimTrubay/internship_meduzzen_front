import React from "react";
import UserMenuAuth0 from "./UserMenuAuth0/UserMenuAuth0";
import AuthNavAuth0 from "./AuthNavAuth0/AuthNavAuth0";
import {useSelector} from "react-redux";
import {selectIsLoggedInAuth0} from "../../redux/auth/selectors";


export const RegisterAuth0: React.FC = () => {
  const isLoggedInAuth0 = useSelector(selectIsLoggedInAuth0);

  return (
    isLoggedInAuth0 ? <UserMenuAuth0/> : <AuthNavAuth0/>
  );
};

