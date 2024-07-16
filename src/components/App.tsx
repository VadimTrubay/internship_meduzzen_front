import React, {lazy, useEffect} from "react";
import "modern-normalize";
import styles from "./App.module.css";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import {RestrictedRoute} from "./RestrictedRoute/RestrictedRoute";
import {PrivateRoute} from "./PrivateRoute/PrivateRoute";
import HealthCheck from "./HealthCheck/HealthCheck";
import UserRegistrationPage from "../pages/UserRegistrationPage/UserRegistrationPage";
import UserAuthorizationPage from "../pages/UserAuthorizationPage/UserAuthorizationPage";
import ListOfUsersPage from "../pages/ListOfUsersPage/ListOfUsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ListOfCompaniesPage from "../pages/ListOfCompaniesPage/ListOfCompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";
import {Box, LinearProgress} from "@mui/material";
import {selectIsLoggedIn, selectLoading} from "../redux/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/auth/operations";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const selectedLoading = useSelector<boolean>(selectLoading);
  const dispatch = useDispatch();
  const selectedIsLoggedIn = useSelector<boolean>(selectIsLoggedIn);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch, selectedIsLoggedIn]);

  return selectedLoading ? (
    <Box sx={{width: "100%", marginTop: 4}}>
      <LinearProgress color="success"/>
    </Box>
  ) : (
    <Layout className={styles.container}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="healthcheck" element={<HealthCheck/>}/>
        <Route
          path="signup"
          element={
            <RestrictedRoute redirectTo="/user-profile" component={<UserRegistrationPage/>}/>
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/user-profile" component={<UserAuthorizationPage/>}/>
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
  )
};

export default App;
