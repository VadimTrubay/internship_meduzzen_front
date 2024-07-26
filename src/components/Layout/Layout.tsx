import React, {Suspense} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {LayoutProps} from "../../types/layoutTypes";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import styles from "../Layout/Layout.module.css";
import {IoPlayBack} from "react-icons/io5";


export const Layout = ({children}: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header/>
      <Navigation/>
      <div className={styles.container_back}>
        <IoPlayBack className={styles.back} onClick={() => {navigate(-1)}}/>
      </div>
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
