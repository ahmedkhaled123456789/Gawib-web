import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { insertData } from "../../utils/api";
import { useGetData } from "../../hooks/useGetData";
import { useInUpdateData } from "../../hooks/useUpdateData";

interface UserData {
  data?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  expiresAt: localStorage.getItem("expiresAt"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

interface UpdateUserArgs {
  id: string;
  data: Partial<UserData>;
}

// ================= Login =================
export const loginUser = createAsyncThunk<
  UserData,
  Record<string, unknown>,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    const res = await insertData<typeof data, UserData>(
      "auth/user/login",
      data
    );
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "Login failed"
    );
  }
});

// ================= Signup =================
export const signupUser = createAsyncThunk<
  UserData,
  Record<string, unknown>,
  { rejectValue: string }
>("auth/signupUser", async (data, thunkAPI) => {
  try {
    const res = await insertData<typeof data, UserData>(
      "auth/user/register",
      data
    );
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "Signup failed"
    );
  }
});

// ================= getUser =================
export const getUser = createAsyncThunk<
  UserData,
  { id: string },
  { rejectValue: string }
>("auth/getUser", async ({ id }, thunkAPI) => {
  try {
    const res = await useGetData<UserData>(`manage/users/${id}`);
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "getUser failed"
    );
  }
});

// ================= update User =================
export const updateUser = createAsyncThunk<
  UserData,
  UpdateUserArgs,
  { rejectValue: string }
>("auth/updateUser", async ({ id, data }, thunkAPI) => {
  try {
    const response = await useInUpdateData<UserData>(
      `manage/users/${id}`,
      data
    );
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "فشل في تحديث المستخدم"
    );
  }
});

// ================= Logout =================
export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await insertData("auth/user/logout", {});
      localStorage.clear();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data.message || "Logout failed"
      );
    }
  }
);

// ================= Slice =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
          state.error = null;

          const access = action.payload.data?.access;
          if (access?.token) {
            state.accessToken = access.token;
            state.expiresAt = access.expires_at;
            localStorage.setItem("accessToken", access.token);
            localStorage.setItem("expiresAt", access.expires_at);
          }

          const refresh = action.payload.data?.refresh;
          if (refresh?.token) {
            state.refreshToken = refresh.token;
            localStorage.setItem("refreshToken", refresh.token);
          }

          const userInfo = action.payload.data?.authenticatable;
          if (userInfo) {
            localStorage.setItem("user", JSON.stringify(userInfo));
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ في تسجيل الدخول";
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
          state.error = null;

          const access = action.payload.data?.access;
          if (access?.token) {
            state.accessToken = access.token;
            state.expiresAt = access.expires_at;
            localStorage.setItem("accessToken", access.token);
            localStorage.setItem("expiresAt", access.expires_at);
          }

          const refresh = action.payload.data?.refresh;
          if (refresh?.token) {
            state.refreshToken = refresh.token;
            localStorage.setItem("refreshToken", refresh.token);
          }

          const userInfo = action.payload.data?.authenticatable;
          if (userInfo) {
            localStorage.setItem("user", JSON.stringify(userInfo));
          }
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ في إنشاء الحساب";
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب بيانات المستخدم";
      })

      // Update User
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
          state.error = null;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في تحديث المستخدم";
      })

      // Logout
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.expiresAt = null;
        state.loading = false;
        state.error = null;
        localStorage.clear();
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في تسجيل الخروج";
      });
  },
});

export default authSlice.reducer;
