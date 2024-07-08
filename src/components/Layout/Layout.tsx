import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import CircularProgress from "@mui/material/LinearProgress";
import Header from "../Header/Header.jsx";
import Box from "@mui/material/Box";
import Navigation from "../Navigation/Navigation";
import styles from "../Layout/Layout.module.css";
import {LayoutProps} from "../../types/layoutTypes";
import Footer from "../Footer/Footer";


export const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header/>
      <Navigation/>
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress/>
        </Box>
      }>
        <div className={styles.fullWidth}>
          {children}
        </div>
        <Outlet/>
      </Suspense>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
};
