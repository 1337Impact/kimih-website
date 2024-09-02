import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

const initialState = {
  user: null as User | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser  } = userSlice.actions;

export default userSlice.reducer;