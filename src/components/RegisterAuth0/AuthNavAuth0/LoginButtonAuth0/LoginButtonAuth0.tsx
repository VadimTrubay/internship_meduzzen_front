import {useAuth0} from '@auth0/auth0-react'
import Button from "@mui/material/Button";
import React from "react";


export const LoginButtonAuth0 = () => {
  const {loginWithRedirect} = useAuth0()

  return (
    <Button className='auth login'
            onClick={loginWithRedirect}
            variant="contained"
    >
      Log In Auth0
    </Button>
  )
}
