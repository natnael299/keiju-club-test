import { useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import Greeting from "@/components/home/Greeting";
import AlertsPreview from "@/components/home/AlertsPreview";
import ClubPreview from "@/components/home/ClubPreview";
import WeeklyReport from "@/components/home/WeeklyReport";

import { useOwnerStore } from "@/store/owner.store";
import { useNotificationsStore } from "@/store/notifications.store";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function Home() {
  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  const fetchNotifications = useNotificationsStore(
    (state) => state.fetchNotifications,
  );

  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    fetchOwners();
    fetchNotifications();
    fetchClubEvents();
  }, [fetchOwners, fetchNotifications, fetchClubEvents]);

  return (
    <AppLayout>
      <Greeting />

      <AlertsPreview />

      <ClubPreview />

      <WeeklyReport />
    </AppLayout>
  );
}
