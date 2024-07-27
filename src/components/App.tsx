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
import CompanyMembersPage from "../pages/CompanyMembersPage/CompanyMembersPage";
import {selectLoading, selectIsLoggedIn} from "../redux/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/auth/operations";
import {Box, LinearProgress} from "@mui/material";
import {AppDispatch} from "../redux/store";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import {useAuth0} from "@auth0/auth0-react";
import {RouterEndpoints} from "../config/routes";
import MyInvitesPage from "../pages/MyInvitesPage/MyInvitesPage";
import MyRequestsPage from "../pages/MyRequestsPage/MyRequestsPage";
import CompanyInvitesPage from "../pages/CompanyInvitesPage/CompanyInvitesPage";
import CompanyRequestsPage from "../pages/CompanyRequestsPage/CompanyRequestsPage";


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
              path={`${RouterEndpoints.membersCompany}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyMembersPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.myInvites}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<MyInvitesPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.myRequests}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<MyRequestsPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.companyInvites}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyInvitesPage/>}/>}
            />
            <Route
              path={`${RouterEndpoints.companyRequests}`}
              element={<PrivateRoute redirectTo={RouterEndpoints.login} component={<CompanyRequestsPage/>}/>}
            />
            <Route path={RouterEndpoints.terms} element={<TermsPage/>}/>
            <Route path={RouterEndpoints.notFound} element={<NotFoundPage/>}/>
          </Routes>
        </Layout>)
  )
};

export default App;
