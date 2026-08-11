import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EventForm, {
  type EventFormValues,
} from "@/components/organizer/EventForm";

import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function EditEvent() {
  const navigate = useNavigate();

  const { eventId } = useParams<{
    eventId: string;
  }>();

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const loading = useClubEventsStore((state) => state.loading);

  const fetchClubEvents = useClubEventsStore((state) => state.fetchClubEvents);

  const updateClubEvent = useClubEventsStore((state) => state.updateClubEvent);

  const [error, setError] = useState<string | null>(null);

  const event = useMemo(() => {
    if (!eventId) {
      return undefined;
    }

    return clubEvents.find((clubEvent) => clubEvent.id === eventId);
  }, [clubEvents, eventId]);

  useEffect(() => {
    if (!event && clubEvents.length === 0) {
      void fetchClubEvents();
    }
  }, [event, clubEvents.length, fetchClubEvents]);

  const handleUpdateEvent = async (values: EventFormValues) => {
    if (!eventId) {
      return;
    }

    setError(null);

    try {
      await updateClubEvent(eventId, {
        title: values.title,
        description: values.description,
        city: values.city,
        address: values.address,
        startsAt: values.startsAt,
        categories: values.categories,
        audience: values.audience,
        endsAt: values.endsAt,
        imageUrl:
          values.imagePreview && !values.imagePreview.startsWith("blob:")
            ? values.imagePreview
            : event?.imageUrl,
      });

      navigate("/organizer/events");
    } catch (error) {
      console.error(error);

      setError("Event update failed. Please try again.");
    }
  };

  if (loading && clubEvents.length === 0) {
    return (
      <OrganizerLayout>
        <div className="py-12 text-center text-sm text-muted-foreground">
          Loading event...
        </div>
      </OrganizerLayout>
    );
  }

  if (!event) {
    return (
      <OrganizerLayout>
        <section>
          <h1 className="text-3xl font-extrabold text-primary">
            Event not found
          </h1>

          <p className="mt-2 text-muted-foreground">
            The requested event could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/organizer/events")}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Back to events
          </button>
        </section>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-3xl font-extrabold text-primary">Edit event</h1>

        <p className="mt-2 text-muted-foreground">Update event details.</p>

        {error && (
          <div className="mt-5 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6">
          <EventForm
            key={event.id}
            initialValues={{
              title: event.title,

              description: event.description,

              city: event.city,

              address: event.address,

              startsAt: toDateTimeLocal(event.startsAt),

              endsAt: toDateTimeLocal(event.endsAt),

              imagePreview: event.imageUrl ?? null,
            }}
            submitLabel="Update event"
            submitting={loading}
            onSubmit={handleUpdateEvent}
          />
        </div>
      </section>
    </OrganizerLayout>
  );
}

function toDateTimeLocal(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
