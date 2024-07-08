import {useState} from "react";
import {AppBar, CircularProgress, Toolbar} from "@mui/material";
import Logo from "../Logo/Logo";
import {useSelector} from "react-redux";
import {selectIsToggleLogged} from "../../redux/auth/selectors";
import styles from "./Header.module.css";
import {RegisterBase} from "../RegisterBase/RegisterBase";
import {RegisterAuth0} from "../RegisterAuth0/RegisterAuth0";

const Header = () => {
  const isToggleLogged = useSelector(selectIsToggleLogged);
  const error = useState<boolean>(false);
  const isLoading = useState<boolean>(false);

  return (
    <div>
      <AppBar className={styles.app_bar} position="static">
        <Toolbar className={styles.app_bar}>
          <Logo/>
          {isToggleLogged ? <RegisterBase/>: <RegisterAuth0/>}
        </Toolbar>
      </AppBar>
      {isLoading && !error && (
        <CircularProgress className={styles.circular_progress}/>
      )}
    </div>
  );
};

export default Header;
