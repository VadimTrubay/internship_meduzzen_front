import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {LayoutProps} from "../../types/layoutTypes";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import styles from "../Layout/Layout.module.css";


export const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header/>
      <Navigation/>
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <LinearProgress/>
        </Box>
      }>
        <div className={styles.children}>
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
