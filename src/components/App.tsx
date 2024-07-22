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
import ListOfCompaniesPage from "../pages/ListOfCompaniesPage/ListOfCompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";
import {selectLoading, selectIsLoggedIn} from "../redux/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/auth/operations";
import {Box, LinearProgress} from "@mui/material";
import {AppDispatch} from "../redux/store";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import {useAuth0} from "@auth0/auth0-react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector<boolean>(selectIsLoggedIn);
  const {isAuthenticated} = useAuth0()
  const loading = useSelector(selectLoading);

    useEffect(() => {
  }, [isAuthenticated, isLoggedIn]);

  useEffect(() => {
    dispatch(getMe());
  }, [isAuthenticated, isLoggedIn, dispatch]);

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
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
                <RestrictedRoute redirectTo="/" component={<UserRegistrationPage/>}/>
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
              path="user/:id"
              element={<PrivateRoute redirectTo="/login" component={<UserProfilePage/>}/>}
            />
            <Route
              path="companies"
              element={<PrivateRoute redirectTo="/login" component={<ListOfCompaniesPage/>}/>}
            />
            <Route
              path="companies/:id"
              element={<PrivateRoute redirectTo="/login" component={<CompanyProfilePage/>}/>}
            />
            <Route path="terms" element={<TermsPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </Layout>)
  )
};

export default App;
