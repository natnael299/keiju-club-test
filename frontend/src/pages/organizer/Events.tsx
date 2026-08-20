import { useEffect } from "react";

import OrganizerEventRow from "@/components/organizer/OrganizerEventRow";
import OrganizerEventsHeader from "@/components/organizer/OrganizerEventsHeader";

import OrganizerLayout from "@/layouts/OrganizerLayout";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function OrganizerEvents() {
  const events = useClubEventsStore((state) => state.clubEvents);

  const loading = useClubEventsStore((state) => state.loading);

  const error = useClubEventsStore((state) => state.error);

  const fetchOrganizationClubEvents = useClubEventsStore(
    (state) => state.fetchOrganizationClubEvents,
  );

  useEffect(() => {
    void fetchOrganizationClubEvents();
  }, [fetchOrganizationClubEvents]);

  return (
    <OrganizerLayout>
      <OrganizerEventsHeader />

      {loading && events.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading events...
        </p>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4">
          <p className="font-semibold text-destructive">
            Events could not be loaded
          </p>

          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-6 text-center">
          <p className="font-semibold text-foreground">No events found</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first event to make it available in Keiju Club.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <OrganizerEventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </OrganizerLayout>
  );
}
