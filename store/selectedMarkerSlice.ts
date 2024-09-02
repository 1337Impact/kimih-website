import { createSlice } from "@reduxjs/toolkit";

interface SelectedMarker {
  id: string;
}

const initialState = {
  selectedMarker: null as SelectedMarker | null,
};

const selectedMarkerSlice = createSlice({
  name: "selectedMarker",
  initialState,
  reducers: {
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
  },
});

export const { setSelectedMarker  } = selectedMarkerSlice.actions;

export default selectedMarkerSlice.reducer;