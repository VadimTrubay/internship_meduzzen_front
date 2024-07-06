import {configureStore} from "@reduxjs/toolkit";
import testReducer from "./test_string/slice";

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});