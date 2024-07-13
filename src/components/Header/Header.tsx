import {useState} from "react";
import {AppBar, CircularProgress, Toolbar} from "@mui/material";
import Logo from "../Logo/Logo";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import styles from "./Header.module.css"


const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <AppBar className={styles.app_bar} position="static">
        <Toolbar className={styles.app_bar}>
          <Logo/>
          <AuthNav/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
