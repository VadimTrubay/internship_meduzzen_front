import React from "react";
import UserMenuBase from "./UserMenuBase/UserMenuBase";
import AuthNavBase from "./AuthNavBase/AuthNavBase";
import {useSelector} from "react-redux";
import {selectIsLoggedInBase} from "../../redux/auth/selectors";


export const RegisterBase: React.FC = () => {
  const isLoggedInBase = useSelector(selectIsLoggedInBase);

  return (
    isLoggedInBase ? <UserMenuBase/> : <AuthNavBase/>
  );
};

