import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../hooks/useGetData";

 
interface SocialLinksData {
  id: null | undefined;
  category_id: number;
  name: string;
  url: string;
  icon: string;
}

interface SocialRespon {
  data: SocialLinksData[]; // 👈 غالبًا بيجيلك Array من الـ API
}

interface SocialLinksState {
  socialLink: SocialLinksData | null; // عنصر واحد
  socialLinks: SocialLinksData[];     // 👈 list
  loading: boolean;
  error: string | null;
}

const initialState: SocialLinksState = {
  socialLink: null,
  socialLinks: [],
  loading: false,
  error: null,
};


// ================ get SocialLinksData ===============
export const getSocialLink = createAsyncThunk<
  SocialRespon,
  { id: string }, 
  { rejectValue: string }
>(
  "socialLinks/getSocialLink",
  async ({ id }, thunkAPI) => {
    try {
      const res = await useGetDataToken<SocialRespon>(`social-links/${id}`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getSocialLinks failed");
    }
  }
);


// ================ getSocialLinks ===============
export const getSocialLinks = createAsyncThunk<
  SocialRespon,
  void, 
  { rejectValue: string }
>(
  "socialLinks/getSocialLinks",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken<SocialRespon>(`social-links`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getGames failed");
    }
  }
);
// ================ Slice ===============
const SocialLinksSlice = createSlice({
  name: "socialLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getsocialLinks
     .addCase(getSocialLink.fulfilled, (state, action: PayloadAction<SocialRespon>) => {
        state.socialLinks = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      // getSocialLinks
.addCase(getSocialLinks.fulfilled, (state, action: PayloadAction<SocialRespon>) => {
        state.socialLinks = action.payload.data;
        state.loading = false;
        state.error = null;
      })       
  },
});

export default SocialLinksSlice.reducer;
