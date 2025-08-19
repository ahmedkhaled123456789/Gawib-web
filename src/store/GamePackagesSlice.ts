import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useGetDataToken } from "../utils/api";

 
interface GamePackagesData {
 category_id: number;
 name: string;
  description: string;
  image:string;
  is_active: boolean,

 }

interface GameState {
  gamePackage: GamePackagesData | null;
  gamePackages :  GamePackagesData | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  gamePackage: null,
  gamePackages:null,
  loading: false,
  error: null,
};

// ================ get game ===============
export const getGamePackage = createAsyncThunk<
  GamePackagesData,
  { id: string }, 
  { rejectValue: string }
>(
  "gamePackage/getGamePackage",
  async ({ id }, thunkAPI) => {
    try {
      const res = await useGetDataToken<GamePackagesData>(`show/game-package/${id}`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getGamePackages failed");
    }
  }
);


// ================ get GamePackages ===============
export const getGamePackages = createAsyncThunk<
  GamePackagesData,
  void, 
  { rejectValue: string }
>(
  "gamePackages/getGamePackages",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken<GamePackagesData>(`show/game-packages`);
      return res;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data.message || "getGames failed");
    }
  }
);
// ================ Slice ===============
const GamePackagesSlice = createSlice({
  name: "gamePackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getGamePackages
     .addCase(getGamePackage.fulfilled, (state, action: PayloadAction<GamePackagesData>) => {
        state.gamePackage = action.payload;
        state.loading = false;
        state.error = null;
      })
      // getGamePackages
.addCase(getGamePackages.fulfilled, (state, action: PayloadAction<GamePackagesData>) => {
        state.gamePackages = action.payload;
        state.loading = false;
        state.error = null;
      })       
  },
});

export default GamePackagesSlice.reducer;
