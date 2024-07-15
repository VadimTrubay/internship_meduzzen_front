import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import styles from "../Navigation/Navigation.module.css";

const Navigation = () => {

  return (
    <div className={styles.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink className={styles.nav_link_breadcrumb} to={"/"}>
          HOME
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/about"}>
          ABOUT
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/users"}>
          USERS
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/my-profile"}>
          USER-PROFILE
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/companies"}>
          COMPANIES
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/company-profile"}>
          COMPANY-PROFILE
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={"/healthcheck"}>
          HEALTHCHECK
        </NavLink>
      </Breadcrumbs>
    </div>
  );
};

export default Navigation;
