import "modern-normalize";
import React, {lazy, useEffect} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {selectAccessToken} from "../redux/auth/selectors";
import {Box, LinearProgress} from "@mui/material";
import {refreshUser} from "../redux/auth/slice";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAccessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (selectedAccessToken) {
      dispatch(refreshUser(false));
    }
  }, [dispatch]);

  return selectedAccessToken ? (
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
          path="auth/user-profile"
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
