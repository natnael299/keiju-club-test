import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/shared/Card";
import type { ClubEvent } from "@/types";

type Props = {
  event: ClubEvent;
};

export default function OrganizerEventRow({ event }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
      className="w-full text-left"
    >
      <Card className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-extrabold text-foreground">
              {event.title}
            </h3>

            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(event.startsAt).toLocaleDateString("fi-FI")}
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.city}
              </span>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-primary" />
        </div>
      </Card>
    </button>
  );
}
