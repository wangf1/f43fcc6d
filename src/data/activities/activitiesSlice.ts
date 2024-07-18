import { Activity } from "@/src/types/activity";
import { ActivitiesState } from "@/src/types/activity_state";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState: ActivitiesState = {
  activities: [],
  status: "idle",
};

const BASE_URL = "https://aircall-backend.onrender.com/activities";

const fetchActivities = createAsyncThunk<Activity[], void>(
  "activities/fetchActivities",
  async () => {
    const response = await axios.get<Activity[]>(BASE_URL);
    return response.data as Activity[];
  }
);

const updateActivity = createAsyncThunk<
  Activity,
  { activity: Activity; is_archived: boolean }
>("activities/updateActivity", async ({ activity, is_archived }) => {
  const response = await axios.patch<Activity>(`${BASE_URL}/${activity.id}`, {
    is_archived,
  });
  return activity;
});

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
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const oldUpdatedActivity = action.payload;
        const updatedActivity = { ...oldUpdatedActivity, is_archived: true };
        const existingCallIndex = state.activities.findIndex(
          (activity) => activity.id === updatedActivity.id
        );
        if (existingCallIndex !== -1) {
          state.activities[existingCallIndex] = updatedActivity;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        // TODO: handle error
        console.log(action.error);
      });
  },
});

export { fetchActivities, updateActivity };
export default activitiesSlice.reducer;
