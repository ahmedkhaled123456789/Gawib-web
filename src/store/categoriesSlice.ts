import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../utils/api";

// ================= Interfaces =================
export interface Item {
  id: string;
  name: string;
  category_id: string;
  description: string;
  game_count?: number; // ✅ optional لأن guest ما بيرجعهاش
  image: string;
  is_free: boolean;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  is_active?: boolean;
  games?: Item[];
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  played_games: number;
  nationality: string;
  total_purchases_amount: string;
  is_first_game: boolean;
  purchased_games: number;
}

// للزوار (guest)
interface GetCategoriesResponse {
  success: boolean;
  status: number;
  message: string;
  data: CategoryData[];
}

// للمسجل (auth)
interface GetCategoriesAuthResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    categories: CategoryData[];
    user: UserData;
  };
}

interface CategoryState {
  categories: CategoryData[];
  loading: boolean;
  error: string | null;
}

// ================= Initial State =================
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// ================= Thunks =================

// ================ getCategoriesAuth ===============
export const getCategoriesAuth = createAsyncThunk<
  CategoryData[],
  void,
  { rejectValue: string }
>("category/getCategoriesAuth", async (_, thunkAPI) => {
  try {
    const res = await useGetDataToken<GetCategoriesAuthResponse>(
      "show/categories"
    );

    // ✅ تحديث الـ user في localStorage
    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }

    return res.data.categories; // ✅ ناخد الـ categories بس
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "getCategoriesAuth failed"
    );
  }
});


// ================ getCategories ===============
export const getCategories = createAsyncThunk<
  CategoryData[],
  void,
  { rejectValue: string }
>("category/getCategories", async (_, thunkAPI) => {
  try {
    const res = await useGetDataToken<GetCategoriesResponse>("home/categories");
    return res.data; // ✅ بيرجع array مباشر
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "getCategories failed"
    );
  }
});

// ================= Slice =================
const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCategoriesAuth
      .addCase(getCategoriesAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategoriesAuth.fulfilled,
        (state, action: PayloadAction<CategoryData[]>) => {
          state.categories = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getCategoriesAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories (auth)";
      })

      // getCategories (guest)
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<CategoryData[]>) => {
          state.categories = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;
