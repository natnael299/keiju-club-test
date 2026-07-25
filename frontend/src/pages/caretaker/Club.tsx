import { useEffect, useMemo, useState } from "react";

import ClubFilters, { type ClubFilter } from "@/components/club/ClubFilters";
import ClubHeader from "@/components/club/ClubHeader";
import ClubList from "@/components/club/ClubList";

import AppLayout from "@/layouts/AppLayout";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function Club() {
  const [activeFilter, setActiveFilter] = useState<ClubFilter>("all");

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    fetchClubEvents();
  }, [fetchClubEvents]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return clubEvents;
    }

    return clubEvents.filter((event) =>
      event.categories.includes(activeFilter),
    );
  }, [clubEvents, activeFilter]);

  return (
    <AppLayout>
      <ClubHeader />

      <ClubFilters activeFilter={activeFilter} onChange={setActiveFilter} />

      <ClubList events={filteredEvents} />
    </AppLayout>
  );
}
