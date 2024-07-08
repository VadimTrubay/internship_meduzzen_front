export const selectIsLoggedInBase = (state) => state.auth.isLoggedInBase;

export const selectIsLoggedInAuth0 = (state) => state.auth.isLoggedInAuth0;

export const selectIsToggleLogged= (state) => state.auth.toggleLogged;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;
