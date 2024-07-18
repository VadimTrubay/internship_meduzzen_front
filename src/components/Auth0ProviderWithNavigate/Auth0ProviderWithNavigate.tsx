import {Auth0Provider} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const Auth0ProviderWithNavigate = ({children}:any) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: { returnTo?: string }) => {
    navigate(appState?.returnTo || '/my-profile');
  };


  return (
    <Auth0Provider
      domain={domain as any}
      clientId={clientId as any}
      audience={audience as any}
      redirectUri={window.location.origin as any}
      onRedirectCallback={onRedirectCallback as any}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
