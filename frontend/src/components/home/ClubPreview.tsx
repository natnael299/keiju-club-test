import { useNavigate } from "react-router-dom";

import ClubEventCard from "@/components/cards/ClubEventCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function ClubPreview() {
  const navigate = useNavigate();

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const handleEventClick = (eventId: string) => {
    navigate(`/app/club?event=${encodeURIComponent(eventId)}`);
  };

  return (
    <section>
      <SectionHeader
        title="Keiju Club"
        actionLabel="Show all"
        onActionClick={() => navigate("/app/club")}
      />

      <div className="space-y-4">
        {clubEvents.slice(0, 3).map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => handleEventClick(event.id)}
            className="block w-full cursor-pointer rounded-2xl text-left transition active:scale-[0.99]"
            aria-label={`Open ${event.title}`}
          >
            <ClubEventCard event={event} />
          </button>
        ))}
      </div>
    </section>
  );
}
