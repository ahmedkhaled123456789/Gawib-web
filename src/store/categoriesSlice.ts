import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../utils/api";

interface Item {
  id: string;
  name: string;
  category_id: string;
  description: string;
  game_count: number;
  image: string;
  is_free: boolean;
}
export interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  games?: Item[];
}
interface CategoriesResponse {
  success: boolean;
  status: number;
  message: string;
  data: CategoryData[];
}

interface CategoryResponse {
  success: boolean;
  status: number;
  message: string;
  data: CategoryData;
}
interface CategoryState {
  category: CategoryData | null;
  categories: CategoryData[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  category: null,
  categories: [],
  loading: false,
  error: null,
};

// ================ getUser ===============
export const getCategory = createAsyncThunk<
  CategoryData,
  { id: string },
  { rejectValue: string }
>("category/getCategory", async ({ id }, thunkAPI) => {
  try {
    const res = await useGetDataToken<CategoryResponse>(`show/category/${id}`);
    return res.data; // ← ناخد الـ data فقط
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "getCategory failed"
    );
  }
});

// ================ getUser ===============
export const getCategories = createAsyncThunk<
  CategoryData[],
  void,
  { rejectValue: string }
>("category/getCategories", async (_, thunkAPI) => {
  try {
    const res = await useGetDataToken<CategoriesResponse>(`home/categories`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "getCategories failed"
    );
  }
});

// ================ Slice ===============
const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get category
      .addCase(
        getCategory.fulfilled,
        (state, action: PayloadAction<CategoryData>) => {
          state.category = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      // getCategories
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<CategoryData[]>) => {
          state.categories = action.payload;
          state.loading = false;
          state.error = null;
        }
      );
  },
});

export default categoriesSlice.reducer;
