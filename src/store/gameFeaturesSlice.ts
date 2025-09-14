// src/store/gameFeaturesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameFeaturesState {
  first_team_double_points: number;
  second_team_double_points: number;
  first_team_call: number;
  second_team_call: number;
}

const initialState: GameFeaturesState = {
  first_team_double_points: 0,
  second_team_double_points: 0,
  first_team_call: 0,
  second_team_call: 0,
};

const gameFeaturesSlice = createSlice({
  name: "gameFeatures",
  initialState,
  reducers: {
    setFirstTeamDoublePoints: (state, action: PayloadAction<number>) => {
      state.first_team_double_points = action.payload;
    },
    setSecondTeamDoublePoints: (state, action: PayloadAction<number>) => {
      state.second_team_double_points = action.payload;
    },
    setFirstTeamCall: (state, action: PayloadAction<number>) => {
      state.first_team_call = action.payload;
    },
    setSecondTeamCall: (state, action: PayloadAction<number>) => {
      state.second_team_call = action.payload;
    },
    resetGameFeatures: () => initialState,
  },
});

export const {
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
  setFirstTeamCall,
  setSecondTeamCall,
  resetGameFeatures,
} = gameFeaturesSlice.actions;

export default gameFeaturesSlice.reducer;
