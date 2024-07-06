import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  testString: "Hello, MEDUZZEN!",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateTestString(state, action) {
      state.testString = action.payload;
    },
  },
});

export const {updateTestString} = testSlice.actions;
export default testSlice.reducer;
