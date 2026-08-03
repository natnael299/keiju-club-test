import { useEffect, useMemo, useState } from "react";

import ClubFilters from "@/components/club/ClubFilters";
import {
  defaultClubFilters,
  type ClubFiltersValue,
} from "@/components/club/clubFilters.types";
import ClubHeader from "@/components/club/ClubHeader";
import ClubList from "@/components/club/ClubList";

import AppLayout from "@/layouts/AppLayout";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function Club() {
  const [clubFilters, setClubFilters] =
    useState<ClubFiltersValue>(defaultClubFilters);

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  useEffect(() => {
    void fetchClubEvents();
  }, [fetchClubEvents]);

  const filteredEvents = useMemo(() => {
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const endOfToday = new Date(startOfToday);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfWeek = new Date(startOfToday);
    const currentWeekday = startOfWeek.getDay();

    const mondayOffset = currentWeekday === 0 ? -6 : 1 - currentWeekday;

    startOfWeek.setDate(startOfWeek.getDate() + mondayOffset);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return clubEvents.filter((event) => {
      const eventStart = new Date(event.startsAt);

      const matchesCategory =
        clubFilters.categories.length === 0 ||
        clubFilters.categories.some((category) =>
          event.categories.includes(category),
        );

      const matchesDate = (() => {
        switch (clubFilters.date) {
          case "today":
            return eventStart >= startOfToday && eventStart <= endOfToday;

          case "thisWeek":
            return eventStart >= startOfWeek && eventStart <= endOfWeek;

          case "thisMonth":
            return eventStart >= startOfMonth && eventStart <= endOfMonth;

          case "custom": {
            if (!clubFilters.customStartDate && !clubFilters.customEndDate) {
              return true;
            }

            const customStart = clubFilters.customStartDate
              ? new Date(`${clubFilters.customStartDate}T00:00:00`)
              : null;

            const customEnd = clubFilters.customEndDate
              ? new Date(`${clubFilters.customEndDate}T23:59:59.999`)
              : null;

            const matchesStart =
              customStart === null || eventStart >= customStart;

            const matchesEnd = customEnd === null || eventStart <= customEnd;

            return matchesStart && matchesEnd;
          }

          case "all":
          default:
            return true;
        }
      })();

      return matchesCategory && matchesDate;
    });
  }, [clubEvents, clubFilters]);

  return (
    <AppLayout>
      <ClubHeader />

      <ClubFilters
        value={clubFilters}
        onChange={setClubFilters}
        resultCount={filteredEvents.length}
      />

      <ClubList events={filteredEvents} />
    </AppLayout>
  );
}
