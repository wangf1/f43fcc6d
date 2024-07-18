"use client";
import { fetchActivities } from "@/src/data/activities/activitiesSlice";
import { AppStore, makeStore } from "@/src/data/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchActivities());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
