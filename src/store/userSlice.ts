import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  [],
  currentUser: [],
  userProfile: [],
  userChangePassword: [],

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
    
  },
 
});
export default userSlice.reducer;
