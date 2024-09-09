import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {setAccessToken} from "../../redux/auth/slice";
import {getMe} from "../../redux/auth/operations";
import styles from "./LoginButtonAuth0.module.css";
import {AppDispatch} from "../../redux/store";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

export const LoginButtonAuth0 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loginWithRedirect, isAuthenticated, getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            prompt: "consent",
          },
        });
        dispatch(setAccessToken(token));
        dispatch(getMe(token));
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <Box className={styles.container}>
        <Button className="auth login" onClick={handleLogin} variant="contained">
          Auth0 login
        </Button>
      </Box>
    </div>
  );
};
