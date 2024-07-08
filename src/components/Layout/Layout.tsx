import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
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
        <Box>
          <LinearProgress color="primary"/>
        </Box>}
      >
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
