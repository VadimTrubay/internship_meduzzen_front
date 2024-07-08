import "modern-normalize";
import React, {lazy} from "react";
import styles from "./App.module.css"
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import {RestrictedRoute} from "./RestrictedRoute/RestrictedRoute";
import {PrivateRoute} from "./PrivateRoute/PrivateRoute";
import HealthCheck from "./HealthCheck/HealthCheck";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const UserRegistrationPage = lazy(() => import("../pages/UserRegistrationPage/UserRegistrationPage"))
const UserAuthorizationPage = lazy(() => import("../pages/UserAuthorizationPage/UserAuthorizationPage"))
const ListOfUsersPage = lazy(() => import("../pages/ListOfUsersPage/ListOfUsersPage"))
const UserProfilePage = lazy(() => import("../pages/UserProfilePage/UserProfilePage"))
const ListOfCompaniesPage = lazy(() => import("../pages/ListOfCompaniesPage/ListOfCompaniesPage"))
const CompanyProfilePage = lazy(() => import("../pages/CompanyProfilePage/CompanyProfilePage"))
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"))
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"))


const App: React.FC = () => {

  return (
    <Layout className={styles.container}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="healthcheck" element={<HealthCheck/>}/>
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/login"
              component={<UserRegistrationPage/>}
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute
              redirectTo="/contacts "
              component={<UserAuthorizationPage/>}
            />
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute redirectTo="/login" component={<ListOfUsersPage/>}/>
          }
        />
        <Route
          path="user-profile"
          element={
            <PrivateRoute redirectTo="/login" component={<UserProfilePage/>}/>
          }
        />
        <Route
          path="companies"
          element={
            <PrivateRoute redirectTo="/login" component={<ListOfCompaniesPage/>}/>
          }
        />
        <Route
          path="company-profile"
          element={
            <PrivateRoute redirectTo="/login" component={<CompanyProfilePage/>}/>
          }
        />
        <Route path="terms" element={<TermsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
