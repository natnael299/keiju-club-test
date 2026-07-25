import { useNavigate } from "react-router-dom";

import ClubEventCard from "@/components/cards/ClubEventCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function ClubPreview() {
  const navigate = useNavigate();

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  return (
    <section className="mb-8">
      <SectionHeader
        title="Keiju Club"
        actionLabel="Show all"
        onActionClick={() => navigate("/app/club")}
      />

      <div className="space-y-4">
        {clubEvents.slice(0, 3).map((event) => (
          <ClubEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
