import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {validationSchemaAuthorization} from "../../validate/validationSchemaAuthorization.js";
import {LoginButtonAuth0} from "../../components/LoginButtonAuth0/LoginButtonAuth0";
import {signIn} from "../../redux/auth/operations";
import {AppDispatch} from "../../redux/store";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import styles from "../UserRegistrationPage/UserRegistrationPage.module.css";
import {initialValueUserAuthorization} from "../../initialValues/initialValues";

const defaultTheme = createTheme();

const UserAuthorizationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: initialValueUserAuthorization,
    validationSchema: validationSchemaAuthorization,
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(signIn(values));
      }
    },
  });

  return (
    !isLoggedIn && (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box className={styles.box}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className={styles.box_submit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                color="primary"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                color="primary"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                className={styles.success}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <span className={styles.span}>Don&apos;t have an account?</span>
                  <Link to="/signup">
                    Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <LoginButtonAuth0/>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
};

export default UserAuthorizationPage;
