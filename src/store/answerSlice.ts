// src/redux/answerSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useInUpdateData } from "../hooks/useUpdateData";

// ======== Interfaces ========
export interface AnswerData {
  id?: string;
  question_id: number;
  who_answered: number;
  first_team_score?: number;
  second_team_score?: number;
  current_team?: number;
  first_team_double_points?: number;
  second_team_double_points?: number;
  first_team_call?: number;
  second_team_call?: number;
  first_team_two_answers?: number;
  second_team_two_answers?: number;
  answer?: string;
}

interface AnswerState {
  answer?: AnswerData;
  loading: boolean;
  error?: string;
}

// ======== Initial State ========
const initialState: AnswerState = {
  answer: undefined,
  loading: false,
  error: undefined,
};

// ======== Async thunk ========
// تعديل الـ thunk
export const updateAnswer = createAsyncThunk<
  any, // أي نوع لأننا نريد response كامل
  AnswerData,
  { rejectValue: string }
>("answer/updateAnswer", async (data, thunkAPI) => {
  try {
    const response = await useInUpdateData<any>(
      `show/in-game/${data.id}`,
      data
    );
    // هنا نقدر نرجع response كامل
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "updateAnswer failed"
    );
  }
});

// ======== Slice ========
const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    clearAnswer: (state) => {
      state.answer = undefined;
      state.error = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAnswer.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload;
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update answer";
      });
  },
});

// ======== Exports ========
export const { setAnswer, clearAnswer } = answerSlice.actions;
export default answerSlice.reducer;
