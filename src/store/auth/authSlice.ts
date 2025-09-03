import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { insertData } from "../../utils/api";
import { useGetData } from "../../hooks/useGetData";
import { useInUpdateData } from "../../hooks/useUpdateData";

interface UserData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"), // ✅ load from localStorage
  loading: false,
  error: null,
};

interface UpdateUserArgs {
  id: string;
  data: Partial<UserData>;
}

// ================ Login ===============
export const loginUser = createAsyncThunk<UserData, Record<string, unknown>, { rejectValue: string }>(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await insertData<typeof data, UserData>("auth/user/login", data);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "Login failed");
    }
  }
);

// ================ Signup ===============
export const signupUser = createAsyncThunk<UserData, Record<string, unknown>, { rejectValue: string }>(
  "auth/signupUser",
  async (data, thunkAPI) => {
    try {
      const res = await insertData<typeof data, UserData>("auth/user/register", data);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "Signup failed");
    }
  }
);

// ================ getUser ===============
export const getUser = createAsyncThunk<UserData, { id: string }, { rejectValue: string }>(
  "auth/getUser",
  async ({ id }, thunkAPI) => {
    try {
      const res = await useGetData<UserData>(`manage/users/${id}`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getUser failed");
    }
  }
);

// ================ update User ===============
export const updateUser = createAsyncThunk<UserData, UpdateUserArgs, { rejectValue: string }>(
  "auth/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await useInUpdateData<UserData>(`manage/users/${id}`, data);
      return response;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "فشل في تحديث المستخدم");
    }
  }
);

// ================ log out ===============
export const logOut = createAsyncThunk<UserData, Record<string, unknown>, { rejectValue: string }>(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      const res = await insertData<typeof data, UserData>("auth/user/logout", data);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "Logout failed");
    }
  }
);

// ================ Slice ===============
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login Cases
     .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
  state.user = action.payload;
  state.loading = false;
  state.error = null;

   const token = action.payload.data?.access?.token;
  if (token) {
    localStorage.setItem("token", token);
  }

   const userInfo = action.payload.data?.authenticatable;
  if (userInfo) {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }
})


      // Signup Cases
     .addCase(signupUser.fulfilled, (state, action: PayloadAction<UserData>) => {
  state.user = action.payload;
  state.loading = false;
  state.error = null;

  const token = action.payload.data?.access?.token;
  const tokenType = action.payload.data?.access?.token_type;
  if (token && tokenType) {
    localStorage.setItem("token", `${tokenType} ${token}`);
  }

  const userInfo = action.payload.data?.authenticatable;
  if (userInfo) {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }
})


      // Get User
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ update localStorage on user update
      })

      // Logout
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("user"); // ✅ clear from localStorage
      });
  },
});

export default authSlice.reducer;
