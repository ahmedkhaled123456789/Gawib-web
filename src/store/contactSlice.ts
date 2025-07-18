import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  [],
  currentUser: [],
  userProfile: [],
  userChangePassword: [],

};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // add contact
    
  },
 
});
export default contactSlice.reducer;
