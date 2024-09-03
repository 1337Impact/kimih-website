import { createSlice } from "@reduxjs/toolkit";

interface CheckoutData {
  business_id: string;
  discount: {
    id: string;
    value: number;
  };
}

const initialState = {
  checkoutData: {
    business_id: "",
    discount: {
      id: "",
      value: 0,
    },
  },
};

const checkoutDataSlice = createSlice({
  name: "checkoutData",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
    setDiscount: (state, action) => {
      state.checkoutData.discount = action.payload;
    },
    setBusinessId: (state, action) => {
        state.checkoutData.business_id = action.payload;
    }
  },
});

export const { setCheckoutData, setDiscount, setBusinessId } = checkoutDataSlice.actions;

export default checkoutDataSlice.reducer;
