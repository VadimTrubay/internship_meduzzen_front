import React, {lazy, useEffect} from "react";
import "modern-normalize";
import styles from "./App.module.css";
import {Route, Routes} from "react-router-dom";
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

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        isLoggedIn &&
        <Layout className={styles.container}>
          <Routes>
            <Route path={RouterEndpoints.index} element={<HomePage/>}/>
            <Route path={RouterEndpoints.about} element={<AboutPage/>}/>
            <Route path={RouterEndpoints.healthcheck} element={<HealthCheck/>}/>
            <Route
              path={RouterEndpoints.signup}
              element={
                <RestrictedRoute redirectTo={RouterEndpoints.index} component={<UserRegistrationPage/>}/>
              }
            />
            <Route
              path={RouterEndpoints.login}
              element={
                <RestrictedRoute redirectTo={RouterEndpoints.index} component={<UserAuthorizationPage/>}/>
              }
            />
            <Route
              path={RouterEndpoints.users}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<ListOfUsersPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.users}/${RouterEndpoints.id}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<UserProfilePage/>}/>}
            />
            <Route
              path={RouterEndpoints.companies}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<ListOfCompaniesPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.companies}/${RouterEndpoints.id}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyProfilePage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.members}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyMembersPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.my}/${RouterEndpoints.invites}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<MyInvitesPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.my}/${RouterEndpoints.requests}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<MyRequestsPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.invites}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyInvitesPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.requests}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyRequestsPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.actions}/${RouterEndpoints.company}/${RouterEndpoints.id}/${RouterEndpoints.admins}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyGetAdminsPage/>}/>}
            />
            <Route path={RouterEndpoints.terms} element={<TermsPage/>}/>
            <Route path={RouterEndpoints.notFound} element={<NotFoundPage/>}/>
          </Routes>
        </Layout>
      )
  )
};

export default App;
