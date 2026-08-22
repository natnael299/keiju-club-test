import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import EventForm, {
  type EventFormValues,
} from "@/components/organizer/EventForm";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function EditEvent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { eventId } = useParams<{
    eventId: string;
  }>();

  const clubEvents = useClubEventsStore((state) => state.clubEvents);

  const loading = useClubEventsStore((state) => state.loading);

  const fetchOrganizationClubEvents = useClubEventsStore(
    (state) => state.fetchOrganizationClubEvents,
  );

  const updateClubEvent = useClubEventsStore((state) => state.updateClubEvent);

  const uploadClubEventImage = useClubEventsStore(
    (state) => state.uploadClubEventImage,
  );

  const [error, setError] = useState<string | null>(null);

  const event = useMemo(() => {
    if (!eventId) {
      return undefined;
    }

    return clubEvents.find((clubEvent) => clubEvent.id === eventId);
  }, [clubEvents, eventId]);

  useEffect(() => {
    if (!event && clubEvents.length === 0) {
      void fetchOrganizationClubEvents();
    }
  }, [event, clubEvents.length, fetchOrganizationClubEvents]);

  const handleUpdateEvent = async (values: EventFormValues): Promise<void> => {
    if (!eventId || !event) {
      return;
    }

    setError(null);

    const registrationUrl = values.registrationUrl.trim();

    try {
      await updateClubEvent(eventId, {
        title: values.title.trim(),
        description: values.description.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        startsAt: values.startsAt,
        endsAt: values.endsAt,
        categories: values.categories,
        audience: values.audience,
        registrationUrl: registrationUrl || undefined,
        registrationStatus: registrationUrl
          ? values.registrationStatus
          : undefined,
        imageUrl: event.imageUrl,
      });

      if (values.imageFile) {
        await uploadClubEventImage(eventId, values.imageFile);
      }

      navigate("/organizer/events");
    } catch (caughtError) {
      console.error("UPDATE EVENT ERROR:", caughtError);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : t("editEventPage.error", {
              defaultValue: "The event could not be updated.",
            }),
      );
    }
  };

  if (loading && clubEvents.length === 0) {
    return (
      <OrganizerLayout>
        <p className="text-muted-foreground">{t("editEventPage.loading")}</p>
      </OrganizerLayout>
    );
  }

  if (!event) {
    return (
      <OrganizerLayout>
        <section>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {t("editEventPage.notFoundTitle")}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {t("editEventPage.notFoundDescription")}
          </p>

          <button
            type="button"
            onClick={() => navigate("/organizer/events")}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t("editEventPage.back")}
          </button>
        </section>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {t("editEventPage.title")}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {t("editEventPage.subtitle")}
        </p>

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
              categories: event.categories,
              audience: event.audience,
              registrationUrl: event.registrationUrl ?? "",
              registrationStatus: event.registrationStatus ?? "open",
              imagePreview: event.imageUrl ?? null,
            }}
            submitLabel={t("eventForm.update")}
            submitting={loading}
            error={error}
            onSubmit={handleUpdateEvent}
          />
        </div>
      </section>
    </OrganizerLayout>
  );
}

function toDateTimeLocal(value: string): string {
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
