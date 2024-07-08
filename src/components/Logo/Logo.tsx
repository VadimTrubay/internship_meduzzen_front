import React from "react";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import styles from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavLink className={styles.nav_link} to='/'>
        <AdbIcon sx={{fontSize: "15px"}}/>
        <Typography className={styles.typography}>
          MEDUZZEN
        </Typography>
      </NavLink>
    </div>
  );
};

export default Logo;
