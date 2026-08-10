import { useEffect, useRef } from "react";

import ClubEventDetailCard from "@/components/cards/ClubEventDetailCard";
import type { ClubEvent } from "@/types";

type Props = {
  events: ClubEvent[];
  selectedEventId?: string | null;
};

export default function ClubList({ events, selectedEventId }: Props) {
  const selectedEventRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedEventId || !selectedEventRef.current) {
      return;
    }

    selectedEventRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedEventId, events]);

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const isSelected = event.id === selectedEventId;

        return (
          <div
            key={event.id}
            ref={isSelected ? selectedEventRef : null}
            className={
              isSelected
                ? "rounded-3xl ring-2 ring-primary ring-offset-4 ring-offset-background"
                : ""
            }
          >
            <ClubEventDetailCard event={event} />
          </div>
        );
      })}
    </div>
  );
}
