import {useAuth0} from '@auth0/auth0-react'
import Button from "@mui/material/Button";
import React from "react";


export const LogoutButtonAuth0 = () => {
  const {logout} = useAuth0()

  return (
    <Button className='auth logout'
            onClick={() => logout({returnTo: window.location.origin})}
            variant="contained"
    >
      Log Out Auth0
    </Button>
)
}