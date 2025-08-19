import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../utils/api";

 
interface CategoryData {
 name: string;
 description: string;
  image: string;
  is_active: boolean;
}

interface CategoryState {
   category: CategoryData | null;
  categories : CategoryData[];
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
  { id: string }, // argument type
  { rejectValue: string }
>(
  "category/getCategory",
  async ({ id }, thunkAPI) => {
    try {
      const res = await useGetDataToken<CategoryData>(`show/category/${id}`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getCategory failed");
    }
  }
);


// ================ getUser ===============
export const getCategories = createAsyncThunk<
  CategoryData[], 
  void, 
  { rejectValue: string }
>(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken<CategoryData[]>(`show/categories`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getCategories failed");
    }
  }
);

// ================ Slice ===============
const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get category 
     .addCase(getCategory.fulfilled, (state, action: PayloadAction<CategoryData>) => {
        state.category = action.payload;
        state.loading = false;
        state.error = null;
      })
      // getCategories
.addCase(getCategories.fulfilled, (state, action: PayloadAction<CategoryData[]>) => {
  state.categories = action.payload;
  state.loading = false;
  state.error = null;
})
  
           
  },
});

export default categoriesSlice.reducer;
