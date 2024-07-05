import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "../Header/Header.jsx";
import Box from "@mui/material/Box";
import Navigation from '../Navigation/Navigation.jsx';
import styles from "../Layout/Layout.module.css";


interface LayoutProps {
  children: React.ReactNode;
  className: string;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header/>
      <Navigation/>
      <Suspense
        fallback={
          <Box className={styles.fullWidth}>
            <LinearProgress color="success"/>
          </Box>
        }
      >
        {children}
        <Outlet/>
      </Suspense>
    </div>
  );
};
