import {useState} from "react";
import {AppBar, CircularProgress, Toolbar} from "@mui/material";
import Logo from "../Logo/Logo";
// import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import styles from "./Header.module.css";

const Header = () => {
  const error = useState<boolean>(true);
  const isLoading = useState<boolean>(true);

  return (
    <div>
      <AppBar className={styles.app_bar} position="static">
        <Toolbar className={styles.app_bar}>
          <Logo/>
          {/*<UserMenu/>*/}
          <AuthNav/>
        </Toolbar>
      </AppBar>
      {isLoading && !error && (
        <CircularProgress className={styles.circular_progress}/>
      )}
    </div>
  );
};

export default Header;
