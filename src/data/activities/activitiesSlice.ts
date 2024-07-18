import { Activity } from "@/src/types/activity";
import { ActivitiesState } from "@/src/types/activity_state";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState: ActivitiesState = {
  activities: [],
  status: "idle",
};

const fetchActivities = createAsyncThunk<Activity[], void>(
  "activities/fetchActivities",
  async () => {
    const response = await axios.get<Activity[]>(
      "https://aircall-backend.onrender.com/activities"
    );
    return response.data as Activity[];
  }
);

// Create the slice
const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = "idle";
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export { fetchActivities };
export default activitiesSlice.reducer;
