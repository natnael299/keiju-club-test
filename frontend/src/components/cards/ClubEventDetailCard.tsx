import { Bookmark, CalendarDays, Clock3, MapPin, Users } from "lucide-react";

import Card from "@/components/shared/Card";
import type { ClubEvent } from "@/types";

type Props = {
  event: ClubEvent;
  onClick?: () => void;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function ClubEventDetailCard({ event, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card className="overflow-hidden p-0 shadow-sm">
        <div className="h-36 w-full bg-secondary">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {event.categories.slice(0, 3).map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-accent/70 px-2.5 py-1 text-xs font-semibold capitalize text-primary"
                >
                  {category}
                </span>
              ))}
            </div>

            <Bookmark className="h-5 w-5 shrink-0 text-primary" />
          </div>

          <h3 className="text-lg font-extrabold leading-snug text-foreground">
            {event.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {event.description}
          </p>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              {formatDate(event.startsAt)}
            </p>

            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              {formatTime(event.startsAt)}–{formatTime(event.endsAt)}
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {event.address}, {event.city}
            </p>

            <p className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              {event.audience === "both"
                ? "Ikääntyneet ja läheiset"
                : event.audience === "owner"
                  ? "Ikääntyneet"
                  : "Läheiset"}
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
}
