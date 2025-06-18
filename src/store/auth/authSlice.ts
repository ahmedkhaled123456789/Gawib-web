import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  [],
  currentUser: [],
  userProfile: [],
  userChangePassword: [],

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
 
});
export default authSlice.reducer;
