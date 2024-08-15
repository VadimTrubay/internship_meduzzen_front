import {configureStore} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {authReducer} from "./auth/slice";
import testReducer from "./test_string/slice";
import {usersReducer} from "./users/slice";
import {companiesReducer} from "./companies/slice";
import {actionsReducer} from "./actions/slice";
import {quizzesReducer} from "./quizzes/slice";
import {resultsReducer} from "./results/slice";
import {analyticsReducer} from "./analytics/slice";
import {notificationsReducer} from "./notifications/slice";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["access_token"],
};

type AuthPersistedState = ReturnType<typeof authReducer>;

export const store = configureStore({
  reducer: {
    auth: persistReducer<AuthPersistedState>(authPersistConfig, authReducer),
    test: testReducer,
    users: usersReducer,
    companies: companiesReducer,
    actions: actionsReducer,
    quizzes: quizzesReducer,
    results: resultsReducer,
    analytics: analyticsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;