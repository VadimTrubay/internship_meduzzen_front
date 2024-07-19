export const get_access_token_from_state = (thunkAPI) => {
   const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    return access_token;
}