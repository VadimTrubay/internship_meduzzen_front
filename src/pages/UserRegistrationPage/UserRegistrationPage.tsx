import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
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
import {Checkbox} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useFormik} from "formik";
import {validationSchemaRegistration} from "../../validate/validationSchemaRegistration.js";
import {LoginButtonAuth0} from "../../components/LoginButtonAuth0/LoginButtonAuth0";
import {signUp} from "../../redux/auth/operations";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "../UserRegistrationPage/UserRegistrationPage.module.css";
import {selectError} from "../../redux/auth/selectors";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [terms, setTerms] = useState<boolean>(false);
  const error = useSelector(selectError)

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaRegistration,
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(signUp(values));
      }
    },
  });

  const handleTermsCheck = (event: { target: HTMLInputElement; }) => {
    const target = event.target as HTMLInputElement;
    setTerms(target.checked);
  };

  const termsCheckboxLabel = (
    <div className={styles.checkbox}>
      I accept <a href="/terms">terms of service</a>
    </div>
  );

  return (
    <>
      {error && toast.error(`Error operation`)}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box className={styles.box}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className={styles.box_submit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    color="primary"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    color="primary"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    color="primary"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    color="primary"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox id="termsCheck" name="termsCheck" color="primary"/>
                }
                id="termsCheck"
                name="termsCheck"
                label={termsCheckboxLabel}
                onChange={handleTermsCheck}
              />
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                className={styles.success}
                disabled={!terms}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <span className={styles.span}>Already have an account?</span>
                  <Link to="/">
                    Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <LoginButtonAuth0/>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default RegistrationForm;
