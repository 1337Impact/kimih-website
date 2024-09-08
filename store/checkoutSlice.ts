import { createSlice } from "@reduxjs/toolkit";

interface CheckoutData {
  business_id: string;
  discount: {
    id: string;
    value: number;
  };
  professional: {
    id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    job_title: string | null | undefined;
    avatar_url: string | null | undefined;
  } | null;
  isMembershipOnly: boolean;
}

const initialState = {
  checkoutData: {
    business_id: "",
    discount: {
      id: "",
      value: 0,
    },
    professional: null,
    isMembershipOnly: false,
  } as CheckoutData,
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
    },
    setProfessional: (state, action) => {
      state.checkoutData.professional = action.payload;
    },
    setIsMembershipOnly: (state, action) => {
      state.checkoutData.isMembershipOnly = action.payload;
    }
  },
});

export const { setCheckoutData, setDiscount, setBusinessId, setProfessional, setIsMembershipOnly } =
  checkoutDataSlice.actions;

export default checkoutDataSlice.reducer;
