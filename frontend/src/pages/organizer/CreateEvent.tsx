import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EventForm, {
  type EventFormValues,
} from "@/components/organizer/EventForm";

import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function CreateEvent() {
  const navigate = useNavigate();

  const createClubEvent = useClubEventsStore((state) => state.createClubEvent);

  const loading = useClubEventsStore((state) => state.loading);

  const [error, setError] = useState<string | null>(null);

  const handleCreateEvent = async (values: EventFormValues) => {
    setError(null);

    try {
      await createClubEvent({
        title: values.title,
        description: values.description,
        city: values.city,
        address: values.address,
        startsAt: values.startsAt,
        endsAt: values.endsAt,

        /*
         * Existing URL can be sent directly.
         *
         * A newly selected local image has a
         * blob: URL, which cannot be stored
         * permanently on the backend.
         */
        imageUrl:
          values.imagePreview && !values.imagePreview.startsWith("blob:")
            ? values.imagePreview
            : undefined,
      });

      navigate("/organizer/events");
    } catch (error) {
      console.error(error);

      setError("Event creation failed. Please try again.");
    }
  };

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-3xl font-extrabold text-primary">Create event</h1>

        <p className="mt-2 text-muted-foreground">
          Add a new activity to Keiju Club.
        </p>

        {error && (
          <div className="mt-5 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6">
          <EventForm
            submitLabel="Create event"
            submitting={loading}
            onSubmit={handleCreateEvent}
          />
        </div>
      </section>
    </OrganizerLayout>
  );
}
