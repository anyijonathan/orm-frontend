import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

interface Loc {
  locationId: string;
  locationName: string;
  locationType: string;
  region: string;
}

interface LocationState {
  currentLocation: Loc | null;
}

const initialState: LocationState = {
  currentLocation: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    initializeLocation: (state, action: PayloadAction<Loc>) => {
      // Initialize location when the user logs in
      state.currentLocation = action.payload;
    },
    addLocation: (state, action: PayloadAction<Loc>) => {
      // Add a new location and replace the existing one
      state.currentLocation = action.payload;
    },
  },
});

export const { initializeLocation, addLocation } = locationSlice.actions;
export default locationSlice.reducer;
