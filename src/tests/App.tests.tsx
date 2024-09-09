import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom';
import {mockAuthReducer} from "./mocks/mockAuthReducer";
import {mockAnalyticsReducer} from "./mocks/mocksAnalyticsReducer";
import {mockUsersReducer} from "./mocks/mockUsersReducer";
import {RouterEndpoints} from "../config/routes";
import App from "../components/App";
import {useAuth0} from "@auth0/auth0-react";



const store = configureStore({
  reducer: {
    auth: mockAuthReducer,
    analytics: mockAnalyticsReducer,
    users: mockUsersReducer,
  },
});

describe("App Component", () => {

  test("renders HomePage on index route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RouterEndpoints.index]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => screen.getByText("Welcome to Home Page"));
    expect(screen.getByText("Welcome to Home Page")).toBeInTheDocument();
  });

  test("redirects to login page if not authenticated", async () => {
    (useAuth0 as jest.Mock).mockReturnValue({isAuthenticated: false});

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RouterEndpoints.users]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => screen.getByText("Login"));
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders loading indicator when loading is true", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders not found page on invalid route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/invalid-route"]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => screen.getByText("404 - Page Not Found"));
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});
