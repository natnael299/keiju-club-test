import OrganizerDashboardHeader from "@/components/organizer/OrganizerDashboardHeader";
import OrganizerQuickActions from "@/components/organizer/OrganizerQuickActions";
import OrganizerStats from "@/components/organizer/OrganizerStats";
import SectionHeader from "@/components/shared/SectionHeader";
import ClubEventDetailCard from "@/components/cards/ClubEventDetailCard";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";
import { useEffect } from "react";

export default function OrganizerDashboard() {
  const events = useClubEventsStore((state) => state.clubEvents);
  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    fetchClubEvents();
  }, [fetchClubEvents]);

  return (
    <OrganizerLayout>
      <OrganizerDashboardHeader />
      <OrganizerStats />
      <OrganizerQuickActions />

      <SectionHeader title="Upcoming events" />

      <div className="grid gap-4 md:grid-cols-2">
        {events.slice(0, 4).map((event) => (
          <ClubEventDetailCard key={event.id} event={event} />
        ))}
      </div>
    </OrganizerLayout>
  );
}
