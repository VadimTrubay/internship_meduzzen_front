import "modern-normalize";
import React, {lazy, useEffect} from "react";
import styles from "./App.module.css";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import {RestrictedRoute} from "./RestrictedRoute/RestrictedRoute";
import {PrivateRoute} from "./PrivateRoute/PrivateRoute";
import HealthCheck from "./HealthCheck/HealthCheck";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {selectIsRefreshing} from "../redux/auth/selectors.js";
import {refreshUser} from "../redux/auth/operations.js";
import {AppDispatch} from "../redux/store";
import UserRegistrationPage from "../pages/UserRegistrationPage/UserRegistrationPage";
import UserAuthorizationPage from "../pages/UserAuthorizationPage/UserAuthorizationPage";
import ListOfUsersPage from "../pages/ListOfUsersPage/ListOfUsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ListOfCompaniesPage from "../pages/ListOfCompaniesPage/ListOfCompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector<boolean>(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress/>
    </Box>
  ) : (
    <Layout className={styles.container}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="healthcheck" element={<HealthCheck/>}/>
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/login" component={<UserRegistrationPage/>}/>
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/" component={<UserAuthorizationPage/>}/>
          }
        />
        <Route
          path="users"
          element={<PrivateRoute redirectTo="/login" component={<ListOfUsersPage/>}/>}
        />
        <Route
          path="user-profile"
          element={<PrivateRoute redirectTo="/login" component={<UserProfilePage/>}/>}
        />
        <Route
          path="companies"
          element={<PrivateRoute redirectTo="/login" component={<ListOfCompaniesPage/>}/>}
        />
        <Route
          path="company-profile"
          element={<PrivateRoute redirectTo="/login" component={<CompanyProfilePage/>}/>}
        />
        <Route path="terms" element={<TermsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
