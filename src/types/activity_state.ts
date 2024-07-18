import { Activity } from "@/src/types/activity";

export interface ActivitiesState {
  activities: Activity[];
  status: "idle" | "loading" | "failed";
}
