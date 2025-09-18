import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import useInsertData from "../hooks/useInsertData";

// ================ Types ===============
interface ReportData {
  question_id: number; 
  comment: string;
}

interface ReportState {
  report: ReportData | null;
  loading: boolean;
  error: string | null;
}

// ================ Initial State ===============
const initialState: ReportState = {
  report: null,
  loading: false,
  error: null,
};

// ================ create report ===============
export const createReport = createAsyncThunk<
  ReportData,
  ReportData,
  { rejectValue: string }
>("report/createReport", async (reportData, thunkAPI) => {
  try {
    const res = await useInsertData<ReportData>(
      `user/report-question`,
      reportData
    );
    return res;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "createReport failed"
    );
  }
});

// ================ Slice ===============
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createReport pending
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // createReport success
      .addCase(createReport.fulfilled, (state, action) => {
        state.report = action.payload;
        state.loading = false;
        state.error = null;
      })
      // createReport failed
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء إرسال الإبلاغ";
      });
  },
});

export default reportSlice.reducer;
