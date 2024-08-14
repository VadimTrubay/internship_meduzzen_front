import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import styles from "../Navigation/Navigation.module.css";
import {mainUrls} from "../../config/urls";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";


const Navigation = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.index}>
          HOME
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.about}>
          ABOUT
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.users.submit}>
          USERS
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.companies.submit}>
          COMPANIES
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.users.byId(currentUser?.id)}>
          MY PROFILE
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.healthcheck}>
          HEALTHCHECK
        </NavLink>
      </Breadcrumbs>
    </div>
  )
    ;
};

export default Navigation;
