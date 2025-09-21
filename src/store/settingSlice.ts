import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../hooks/useGetData";

// شكل البيانات الراجعة من الـ API
interface SettingData {
  id: number;
  key: string;
  value: string;
}

interface SettingState {
  setting: SettingData | null;
  settings: SettingData[];   // 👈 Array
  loading: boolean;
  error: string | null;
}

const initialState: SettingState = {
  setting: null,
  settings: [],
  loading: false,
  error: null,
};

// ================ getSetting by ID ===============
export const getSetting = createAsyncThunk<
  SettingData,
  { id: string },
  { rejectValue: string }
>(
  "setting/getSetting",
  async ({ id }, thunkAPI) => {
    try {
      const res = await useGetDataToken<SettingData>(`settings/${id}`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getSetting failed");
    }
  }
);

// ================ getSettings (all) ===============
export const getSettings = createAsyncThunk<
  SettingData[],   // 👈 Array
  void,
  { rejectValue: string }
>(
  "setting/getSettings",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken<{ data: SettingData[] }>(`settings`);
      return res.data; // 👈 Array من الـ response
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getSettings failed");
    }
  }
);

// ================ Slice ===============
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getSetting
      .addCase(getSetting.fulfilled, (state, action: PayloadAction<SettingData>) => {
        state.setting = action.payload;
        state.loading = false;
        state.error = null;
      })
      // getSettings
      .addCase(getSettings.fulfilled, (state, action: PayloadAction<SettingData[]>) => {
        state.settings = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default settingSlice.reducer;
