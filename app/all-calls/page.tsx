import ActivityList from "@/components/activity_feed/ActivityList";

export default function InboxPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <ActivityList includingArchived={true} />
    </main>
  );
}
