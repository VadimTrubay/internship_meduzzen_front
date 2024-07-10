import React from "react";
import Button from "@mui/material/Button";
import styles from "../UserMenu/UserMenu.module.css";
// import {logOut} from "../../redux/auth/operations";
// import {useDispatch} from "react-redux";
// import {AppDispatch} from "../../redux/store";
import {useAuth0} from "@auth0/auth0-react";


export const LogoutButton = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const {logout} = useAuth0()


  return (
    <Button className={styles.nav_link}
      // onClick={() => dispatch(logOut())}
      onClick={() => logout({returnTo: window.location.origin})}
      variant="contained">
      Logout
    </Button>
  )
}