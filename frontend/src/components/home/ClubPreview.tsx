import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ClubEventCard from "@/components/cards/ClubEventCard";
import SectionHeader from "@/components/shared/SectionHeader";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function ClubPreview() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const handleEventClick = (eventId: string) => {
    navigate(`/app/club?event=${encodeURIComponent(eventId)}`);
  };

  return (
    <section className="mt-8">
      <SectionHeader
        title="Keiju Club"
        actionLabel={t("home.showAll")}
        onActionClick={() => navigate("/app/club")}
      />

      <div className="space-y-4">
        {clubEvents.slice(0, 3).map((event) => (
          <ClubEventCard
            key={event.id}
            event={event}
            onClick={() => handleEventClick(event.id)}
          />
        ))}
      </div>
    </section>
  );
}
