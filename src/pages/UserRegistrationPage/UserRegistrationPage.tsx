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
import {useState} from "react";
import styles from "../UserAuthorizationPage/UserAuthorizationPage.module.css";

const defaultTheme = createTheme();

const RegistrationForm = () => {
  const [terms] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchemaRegistration,
    onSubmit: () => {}
  });

  const handleTermsCheck = () => {
  };

  const termsCheckboxLabel = (
    <div>
      I accept <a href="/terms">terms of service</a>
    </div>
  );

  return (
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
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  color="success"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  color="success"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  color="success"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
              color="success"
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
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegistrationForm;
