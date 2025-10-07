import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosRequest from "../Api/baseURL"; 

interface AddQuestionState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddQuestionState = {
  loading: false,
  error: null,
  success: false,
};

export const addQuestion = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("questions/addQuestion", async (formData, thunkAPI) => {
  try {
    const response = await axiosRequest.post(`user/add-question`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    let err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message);
  }
});

const addQuestionSlice = createSlice({
  name: "addQuestion",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addQuestion.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "خطأ في إضافة السؤال";
      });
  },
});

export const { resetState } = addQuestionSlice.actions;

export default addQuestionSlice.reducer;
