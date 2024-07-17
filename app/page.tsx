import ActivityFeed from "@/components/activity_feed/ActivityFeed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ActivityFeed />
    </main>
  );
}
