import { useState } from "react";

import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/components/shared/Card";

import { useClubEventsStore } from "@/store/clubEvents.store";

import type { ClubEvent } from "@/types";

type Props = {
  event: ClubEvent;
};

export default function OrganizerEventRow({ event }: Props) {
  const navigate = useNavigate();

  const deleteClubEvent = useClubEventsStore((state) => state.deleteClubEvent);

  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (): Promise<void> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      await deleteClubEvent(event.id);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The event could not be deleted.",
      );

      setDeleting(false);
    }
  };

  return (
    <Card className="px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
            aria-label={`Edit ${event.title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={deleting}
            aria-label={`Delete ${event.title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-destructive/30 text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </Card>
  );
}
