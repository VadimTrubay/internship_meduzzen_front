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
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage";
import ListOfCompaniesPage from "../pages/ListOfCompaniesPage/ListOfCompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";
import {selectLoading, selectIsLoggedIn} from "../redux/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/auth/operations";
import {Box, CircularProgress} from "@mui/material";
import UserProfile from "./UserProfile/UserProfile";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<boolean>(selectIsLoggedIn);
  const loading = useSelector(selectLoading);


  useEffect(() => {
    dispatch(getMe());
  }, [dispatch, isLoggedIn, loading]);

  return (
    loading && isLoggedIn ?
      (
        <Box>
          <CircularProgress className={styles.circular_progress}/>
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
              path="my-profile"
              element={<PrivateRoute redirectTo="/login" component={<MyProfilePage/>}/>}
            />
            <Route
              path="user/:id"
              element={<PrivateRoute redirectTo="/login" component={<UserProfile/>}/>}
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
        </Layout>)
  )
};

export default App;
