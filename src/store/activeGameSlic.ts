import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../utils/api";

interface ActiveGamesState {
  loading: boolean;
  error: string | null;
  games: any[];
}

const initialState: ActiveGamesState = {
  loading: false,
  error: null,
  games: [],
};

// AsyncThunk لجلب الألعاب الحالية
export const getActiveGames = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("activeGames/fetchActiveGames", async (_, thunkAPI) => {
  try {
    const response = await useGetDataToken("user/active-games");
    return (response as { data: any[] }).data;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      String(err.response?.data) || "Error fetching active games"
    );
  }
});

const activeGamesSlice = createSlice({
  name: "activeGames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActiveGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getActiveGames.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.games = action.payload;
        }
      )
      .addCase(getActiveGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch active games";
      });
  },
});

export default activeGamesSlice.reducer;
