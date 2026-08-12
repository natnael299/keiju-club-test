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
  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const fetchOwnerNotifications = useNotificationsStore(
    (state) => state.fetchOwnerNotifications,
  );

  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    if (!selectedOwnerId) {
      return;
    }

    void fetchOwnerNotifications(selectedOwnerId);
  }, [selectedOwnerId, fetchOwnerNotifications]);

  useEffect(() => {
    void fetchClubEvents();
  }, [fetchClubEvents]);

  return (
    <AppLayout>
      <Greeting />

      <AlertsPreview />

      <ClubPreview />

      <WeeklyReport />
    </AppLayout>
  );
}
