import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import useInsertData from "../hooks/useInsertData";

interface GameData {
  user_id?: string; // مش شرط تبعته
  ids?: string[];
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
>("game/createGame", async (gameData, thunkAPI) => {
  try {
    const res = await useInsertData<GameData>(`show/pre-game`, gameData);
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "createGame failed"
    );
  }
});

// ================ first game ===============
export const firstGame = createAsyncThunk<
  any,
  Omit<GameData, "ids" | "user_id">,
  { rejectValue: string }
>("game/firstGame", async (gameData, thunkAPI) => {
  try {
    const res = await useInsertData<any>("show/first-game", gameData);
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "firstGame failed"
    );
  }
});

// ================ Slice ===============
const preGameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.preGame = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء إنشاء اللعبة";
      });
  },
});

export default preGameSlice.reducer;
