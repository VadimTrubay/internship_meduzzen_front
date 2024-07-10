import React from "react";
import Button from "@mui/material/Button";
import styles from "../UserMenu/UserMenu.module.css";
import {useAuth0} from "@auth0/auth0-react";


export const LogoutButton = () => {
  const {logout} = useAuth0()

  // @ts-ignore
  return (
    <Button className={styles.nav_link}
            onClick={() => logout({returnTo: window.location.origin})}
            variant="contained">
      Logout
    </Button>
  )
}