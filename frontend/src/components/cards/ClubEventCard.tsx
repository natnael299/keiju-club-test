import {
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  MapPin,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";

import type { ClubEvent } from "@/types";

type ClubEventCardProps = {
  event: ClubEvent;
  onClick?: () => void;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function ClubEventCard({ event, onClick }: ClubEventCardProps) {
  const { t } = useTranslation();

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card className="px-3 py-2.5 shadow-sm transition hover:bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-secondary">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-extrabold text-foreground">
              {event.title}
            </h3>

            <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />

                {formatDate(event.startsAt)}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />

                {formatTime(event.startsAt)}
              </span>
            </div>

            <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />

              {event.city}
            </p>

            {event.registrationUrl && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-primary">
                <ExternalLink className="h-3.5 w-3.5" />

                {t("clubEvent.registrationAvailable", {
                  defaultValue: "Registration available",
                })}
              </p>
            )}
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </div>
      </Card>
    </button>
  );
}
