import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosRequest from "../Api/baseURL"; // استدعاء الـ axiosRequest

// نوع البيانات اللي بيرجعها الـ backend بعد تطبيق الخصم
export interface DiscountResult {
  discount_amount: number;
  final_amount: number;
}

// الجسم الكامل للـ response الناجح
export interface SuccessResponse {
  success?: boolean;
  status?: number;
  message: string;
  data?: DiscountResult;
}

// جسم الخطأ
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// حالة الـ slice
interface DiscountState {
  loading: boolean;
  discount: DiscountResult | null;
  message: string | null;
  error: string | null;
}

const initialState: DiscountState = {
  loading: false,
  discount: null,
  message: null,
  error: null,
};

// thunk لتطبيق كود الخصم باستخدام Axios
export const applyDiscount = createAsyncThunk<
  SuccessResponse,
  { package_id: number; code: string },
  { rejectValue: ErrorResponse }
>(
  "discount/applyDiscount",
  async ({ package_id, code }, { rejectWithValue }) => {
    try {
      const res = await axiosRequest.post<SuccessResponse>(
        `apply-discount?code=${code}&package_id=${package_id}`
      );

      // نستخدم undefined بدل null
      return {
        success: res.data.success ?? true,
        status: res.data.status ?? res.status,
        message: res.data.message ?? "تم تطبيق الخصم بنجاح",
        data: res.data.data, // undefined إذا مفيش data
      };
    } catch (error: any) {
      const errData: ErrorResponse = error.response?.data ?? {
        message: "كود الخصم غير صالح",
      };
      return rejectWithValue(errData);
    }
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    clearDiscount: (state) => {
      state.discount = null;
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        applyDiscount.fulfilled,
        (state, action: PayloadAction<SuccessResponse>) => {
          state.loading = false;
          state.discount = action.payload.data ?? null;
          state.message = action.payload.message ?? null;
          state.error = null;
        }
      )
      .addCase(applyDiscount.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error?.message ?? "كود الخصم غير صالح";
        }
        state.discount = null;
        state.message = null;
      });
  },
});

export const { clearDiscount } = discountSlice.actions;
export default discountSlice.reducer;
