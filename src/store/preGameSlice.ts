import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import useInsertData from "../hooks/useInsertData";

interface GameData {
  user_id: string;
  ids: string[];
  game_name: string;
  first_team_name: string;
  second_team_name: string;
  first_team_players_count: string;
  second_team_players_count: string;
}

interface GameState {
  preGame: GameData | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  preGame: null,
  loading: false,
  error: null,
};

// ================ create game ===============
export const createGame = createAsyncThunk<
  GameData,
  GameData,
  { rejectValue: string }
>(
  "game/createGame",
  async (gameData, thunkAPI) => {
    try {
      const res = await useInsertData<GameData>(`show/pre-game`, gameData);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data.message || "createGame failed"
      );
    }
  }
);

// ================ Slice ===============
const preGameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createGame pending
      .addCase(createGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // createGame success
      .addCase(createGame.fulfilled, (state, action) => {
        state.preGame = action.payload;
        state.loading = false;
        state.error = null;
      })
      // createGame failed
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء إنشاء اللعبة";
      });
  },
});

export default preGameSlice.reducer;
