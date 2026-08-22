import { useEffect, useMemo, useState } from "react";

import ClubEventDetailCard from "@/components/cards/ClubEventDetailCard";
import OrganizerDashboardHeader from "@/components/organizer/OrganizerDashboardHeader";
import OrganizerQuickActions from "@/components/organizer/OrganizerQuickActions";
import OrganizerStats from "@/components/organizer/OrganizerStats";
import LoadError from "@/components/shared/LoadError";
import SectionHeader from "@/components/shared/SectionHeader";

import OrganizerLayout from "@/layouts/OrganizerLayout";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function OrganizerDashboard() {
  const events = useClubEventsStore((state) => state.clubEvents);

  const loading = useClubEventsStore((state) => state.loading);

  const error = useClubEventsStore((state) => state.error);

  const fetchOrganizationClubEvents = useClubEventsStore(
    (state) => state.fetchOrganizationClubEvents,
  );

  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    void fetchOrganizationClubEvents();
  }, [fetchOrganizationClubEvents]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(Date.now());
    };

    const initialTimer = window.setTimeout(updateCurrentTime, 0);

    const interval = window.setInterval(updateCurrentTime, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  const activeEvents = useMemo(() => {
    if (currentTime === null) {
      return [];
    }

    return events
      .filter((event) => {
        const endTime = new Date(event.endsAt).getTime();

        return !Number.isNaN(endTime) && endTime >= currentTime;
      })
      .sort(
        (firstEvent, secondEvent) =>
          new Date(firstEvent.startsAt).getTime() -
          new Date(secondEvent.startsAt).getTime(),
      );
  }, [events, currentTime]);

  const isInitializing = loading || currentTime === null;

  return (
    <OrganizerLayout>
      <OrganizerDashboardHeader />

      <OrganizerStats
        activeEvents={activeEvents.length}
        totalEvents={events.length}
      />

      <OrganizerQuickActions />

      <SectionHeader title="Upcoming events" />

      {isInitializing && events.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading events...
        </p>
      ) : error ? (
        <LoadError
          title="Events could not be loaded"
          message={error}
          retrying={loading}
          onRetry={fetchOrganizationClubEvents}
        />
      ) : activeEvents.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-6 text-center">
          <p className="font-semibold text-foreground">No active events</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a new event to make it available in Keiju Club.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {activeEvents.slice(0, 4).map((event) => (
            <ClubEventDetailCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </OrganizerLayout>
  );
}
