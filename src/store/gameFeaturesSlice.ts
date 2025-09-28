// src/store/gameFeaturesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameFeaturesState {
  // double points (GameBoard)
  first_team_double_points: number;
  second_team_double_points: number;

  // call
  first_team_call: number;
  second_team_call: number;

  // two answers (QuestionPage)
  first_team_two_answers: number;
  second_team_two_answers: number;
}

const initialState: GameFeaturesState = {
  first_team_double_points: 0,
  second_team_double_points: 0,
  first_team_call: 0,
  second_team_call: 0,
  first_team_two_answers: 0,
  second_team_two_answers: 0,
};

const gameFeaturesSlice = createSlice({
  name: "gameFeatures",
  initialState,
  reducers: {
    // double points
    setFirstTeamDoublePoints: (state, action: PayloadAction<number>) => {
      state.first_team_double_points = action.payload;
    },
    setSecondTeamDoublePoints: (state, action: PayloadAction<number>) => {
      state.second_team_double_points = action.payload;
    },

    // call
    setFirstTeamCall: (state, action: PayloadAction<number>) => {
      state.first_team_call = action.payload;
    },
    setSecondTeamCall: (state, action: PayloadAction<number>) => {
      state.second_team_call = action.payload;
    },

    // two answers
    setFirstTeamTwoAnswers: (state, action: PayloadAction<number>) => {
      state.first_team_two_answers = action.payload;
    },
    setSecondTeamTwoAnswers: (state, action: PayloadAction<number>) => {
      state.second_team_two_answers = action.payload;
    },

    resetGameFeatures: () => initialState,
  },
});

export const {
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
  setFirstTeamCall,
  setSecondTeamCall,
  setFirstTeamTwoAnswers,
  setSecondTeamTwoAnswers,
  resetGameFeatures,
} = gameFeaturesSlice.actions;

export default gameFeaturesSlice.reducer;
