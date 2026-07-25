import { useEffect } from "react";

import OrganizerEventRow from "@/components/organizer/OrganizerEventRow";
import OrganizerEventsHeader from "@/components/organizer/OrganizerEventsHeader";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function OrganizerEvents() {
  const events = useClubEventsStore((state) => state.clubEvents);
  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    fetchClubEvents();
  }, [fetchClubEvents]);

  return (
    <OrganizerLayout>
      <OrganizerEventsHeader />

      <div className="space-y-3">
        {events.map((event) => (
          <OrganizerEventRow key={event.id} event={event} />
        ))}
      </div>
    </OrganizerLayout>
  );
}
