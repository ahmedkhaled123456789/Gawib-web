import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useInUpdateData } from "../hooks/useUpdateData";
// نوع بيانات الـ state
interface GameState {
  loading: boolean;
  error: string | null;
  data: any;
}

// الـ state الابتدائي
const initialState: GameState = {
  loading: false,
  error: null,
  data: null,
};

// AsyncThunk لعمل PUT request
export const endGame = createAsyncThunk<
  any,
  { gameId: number; payload: any },
  { rejectValue: string }
>("endGame/endGame", async ({ gameId, payload }, thunkAPI) => {
  try {
    const response = await useInUpdateData<any>(
      `show/end-game/${gameId}`,
      payload
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      String(err.response?.data) || "Error ending game"
    );
  }
});

// Slice بدون clearGameState
const endGameSlice = createSlice({
  name: "endGame",
  initialState,
  reducers: {}, // ← لا يوجد أي reducers عادية
  extraReducers: (builder) => {
    builder
      .addCase(endGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endGame.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(endGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to end game";
      });
  },
});

export default endGameSlice.reducer;
