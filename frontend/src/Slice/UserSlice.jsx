import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    login: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    Loginuser: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { Loginuser } = userSlice.actions;
export default userSlice.reducer;
