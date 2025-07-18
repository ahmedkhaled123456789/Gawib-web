import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import passwordReducer from "./resetPassword";

const store = configureStore({
  reducer: {
    auth: authReducer,
    password:passwordReducer,
  },
});

 export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
