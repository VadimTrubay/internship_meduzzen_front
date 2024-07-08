import React from "react";
import "modern-normalize";
import ReactDOM from "react-dom/client";
import {store, persistor} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import App from "./components/App";
import Auth0ProviderWithNavigate from "./components/RegisterAuth0/Auth0ProviderWithNavigate/Auth0ProviderWithNavigate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider>
              <App/>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
