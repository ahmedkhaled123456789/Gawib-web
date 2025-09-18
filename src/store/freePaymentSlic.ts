import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import useInsertData from "../hooks/useInsertData";

// ======== Types ========
export interface FreePaymentData {
  package_id: number;
  receiver_email?: string;
  receiver_phone?: string;
}

export interface FreePaymentResult {
  package_id: number;
  status?: string;
  message?: string;
}

export interface FreePaymentState {
  payment: FreePaymentResult | null;
  loading: boolean;
  error: string | null;
}

// ======== Initial State ========
const initialState: FreePaymentState = {
  payment: null,
  loading: false,
  error: null,
};

// ======== create free payment thunk ========
export const createFreePayment = createAsyncThunk<
  FreePaymentResult, // نوع البيانات اللي هترجع
  FreePaymentData, // نوع البيانات اللي هنرسلها
  { rejectValue: string }
>("freePayment/createFreePayment", async (paymentData, thunkAPI) => {
  try {
    const res: any = await useInsertData(
      "user/payments/free-payment",
      paymentData
    );

    // تحويل الـ response لأي نوع متوقع
    const payment: FreePaymentResult = {
      package_id: res.package_id,
      status: res.status,
      message: res.message,
    };

    return payment;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "createFreePayment failed"
    );
  }
});

// ======== Slice ========
const freePaymentSlice = createSlice({
  name: "freePayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFreePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createFreePayment.fulfilled,
        (state, action: PayloadAction<FreePaymentResult>) => {
          state.payment = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(createFreePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء الدفع المجاني";
      });
  },
});

export default freePaymentSlice.reducer;
