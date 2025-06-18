import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useInsertData} from "../../hooks/useInsertData";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsUpdateData } from "../../hooks/useUpdateData";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await useInsertData("/api/v1/auth/login", data);
      // const data = await res.json();
      return res;
    } catch (e) {
      return e.response;
    }
  }
);


// ================signup==================

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data, thunkAPI) => {
    try {
      const res = await useInsertData("/api/v1/auth/signup", data);
      // const data = await res.json();
      return res;
    } catch (e) {
      return e.response;
    }
  }
);



export const getLoggedUser = createAsyncThunk(
  "user/getLoggedUser",
  async (data, thunkAPI) => {
    try {
      const res = await useGetDataToken("/api/v1/users/getMe");
      // const data = await res.json();
      return res;
    } catch (e) {
      return e.response;
    }
  }
);



export const updateUserProfileData = createAsyncThunk(
  "user/updateUserProfileData",
  async (data, thunkAPI) => {
    try {
      const res = await useInsUpdateData("/api/v1/users/updateMe",data);
      // const data = await res.json();
      return res;
    } catch (e) {
      return e.response;
    }
  }
);




export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (data, thunkAPI) => {
    try {
      const res = await useInsUpdateData("/api/v1/users/changeMyPassword",data);
      // const data = await res.json();
      return res;
    } catch (e) {
      return e.response;
    }
  }
);

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
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    });



    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    });
    
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    });


    builder.addCase(updateUserProfileData.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      console.log(state.userProfile);
    });

    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.userChangePassword = action.payload;
      console.log(state.userChangePassword);
    });
  },
});
export default authSlice.reducer;
