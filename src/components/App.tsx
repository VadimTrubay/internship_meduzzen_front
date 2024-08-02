import React, {lazy, useEffect} from "react";
import "modern-normalize";
import styles from "./App.module.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import {RestrictedRoute} from "./RestrictedRoute/RestrictedRoute";
import {PrivateRoute} from "./PrivateRoute/PrivateRoute";
import HealthCheck from "./HealthCheck/HealthCheck";
import {selectLoading, selectIsLoggedIn} from "../redux/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/auth/operations";
import {Box, LinearProgress} from "@mui/material";
import {AppDispatch} from "../redux/store";
import {useAuth0} from "@auth0/auth0-react";
import {RouterEndpoints} from "../config/routes";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage/UserProfilePage"));
const CompanyProfilePage = lazy(() => import("../pages/CompanyProfilePage/CompanyProfilePage"));
const ListOfUsersPage = lazy(() => import("../pages/ListOfUsersPage/ListOfUsersPage"));
const ListOfCompaniesPage = lazy(() => import("../pages/ListOfCompaniesPage/ListOfCompaniesPage"));
const MyInvitesPage = lazy(() => import("../pages/MyInvitesPage/MyInvitesPage"));
const MyRequestsPage = lazy(() => import("../pages/MyRequestsPage/MyRequestsPage"));
const CompanyMembersPage = lazy(() => import("../pages/CompanyMembersPage/CompanyMembersPage"));
const CompanyGetAdminsPage = lazy(() => import("../pages/CompanyGetAdminsPage/CompanyGetAdminsPage"));
const CompanyInvitesPage = lazy(() => import("../pages/CompanyInvitesPage/CompanyInvitesPage"));
const CompanyRequestsPage = lazy(() => import("../pages/CompanyRequestsPage/CompanyRequestsPage"));
const UserRegistrationPage = lazy(() => import("../pages/UserRegistrationPage/UserRegistrationPage"));
const UserAuthorizationPage = lazy(() => import("../pages/UserAuthorizationPage/UserAuthorizationPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector<boolean>(selectIsLoggedIn);
  const {isAuthenticated} = useAuth0()
  const loading = useSelector(selectLoading);


  useEffect(() => {
    dispatch(getMe());
  }, [isAuthenticated, isLoggedIn, dispatch]);

  if (loading) {
    return (
      <Box>
        <LinearProgress/>
      </Box>
    );
  }

  return (
    <Layout className={styles.container}>
      <Routes>
        <Route path={RouterEndpoints.index} element={<HomePage/>}/>
        <Route path={RouterEndpoints.about} element={<AboutPage/>}/>
        <Route path={RouterEndpoints.healthcheck} element={<HealthCheck/>}/>
        <Route
          path={RouterEndpoints.signup}
          element={isLoggedIn ? <Navigate to={RouterEndpoints.index}/> : <UserRegistrationPage/>}
        />
        <Route
          path={RouterEndpoints.login}
          element={isLoggedIn ? <Navigate to={RouterEndpoints.index}/> : <UserAuthorizationPage/>}
        />
        isLoggedIn &&
        <Route
          path={RouterEndpoints.users}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <ListOfUsersPage/>}
        />
        <Route
          path={`${RouterEndpoints.users}/${RouterEndpoints.id}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <UserProfilePage/>}
        />
        <Route
          path={RouterEndpoints.companies}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <ListOfCompaniesPage/>}
        />
        <Route
          path={`${RouterEndpoints.companies}/${RouterEndpoints.id}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <CompanyProfilePage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.members}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <CompanyMembersPage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.my}/${RouterEndpoints.invites}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <MyInvitesPage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.my}/${RouterEndpoints.requests}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <MyRequestsPage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.invites}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <CompanyInvitesPage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.requests}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <CompanyRequestsPage/>}
        />
        <Route
          path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.admins}`}
          element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <CompanyGetAdminsPage/>}
        />
        <Route path={RouterEndpoints.notFound} element={<NotFoundPage/>}/>
        <Route path={RouterEndpoints.terms} element={<TermsPage/>}/>
        <Route path={RouterEndpoints.notFound} element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  )
};

export default App;
