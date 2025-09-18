import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import useInsertData from "../hooks/useInsertData";

// ======== Types ========
export interface PaymentData {
  package_id: number;
  amount: number;
  receiver_email?: string;
  receiver_phone?: string;
}

export interface PaymentResult {
  transaction_id: string;
  status: string;
  amount: number;
  package_id: number;
  payment_url: string;
}

export interface PaymentState {
  payment: PaymentResult | null;
  loading: boolean;
  error: string | null;
}

// ======== Initial State ========
const initialState: PaymentState = {
  payment: null,
  loading: false,
  error: null,
};

// ======== create payment thunk ========
export const createPayment = createAsyncThunk<
  PaymentResult, // نوع البيانات اللي هترجع
  PaymentData, // نوع البيانات اللي هنرسلها
  { rejectValue: string }
>("payment/createPayment", async (paymentData, thunkAPI) => {
  try {
    // هنا نعتبر useInsertData بيرجع أي نوع (any)
    const res: any = await useInsertData("user/payments/checkout", paymentData);

    // نفترض أن السيرفر بيرجع { data: PaymentResult; payment_url: string }
    const payment: PaymentResult = {
      transaction_id: res.data.transaction_id,
      status: res.data.status,
      amount: res.data.amount,
      package_id: res.data.package_id,
      payment_url: res.payment_url,
    };

    return payment;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || "createPayment failed"
    );
  }
});

// ======== Slice ========
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPayment.fulfilled,
        (state, action: PayloadAction<PaymentResult>) => {
          state.payment = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء الدفع";
      });
  },
});

export default paymentSlice.reducer;
