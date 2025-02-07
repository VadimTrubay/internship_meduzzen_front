import React from "react";
import "modern-normalize";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {store, persistor} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {PersistGate} from "redux-persist/integration/react";
import App from "./components/App";
import Auth0ProviderWithNavigate from "./components/Auth0ProviderWithNavigate/Auth0ProviderWithNavigate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider>
              <App/>
            </HelmetProvider>
          </PersistGate>
        </Auth0ProviderWithNavigate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
