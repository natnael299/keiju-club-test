import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import EventForm, {
  type EventFormValues,
} from "@/components/organizer/EventForm";

import OrganizerLayout from "@/layouts/OrganizerLayout";

import { useClubEventsStore } from "@/store/clubEvents.store";

export default function CreateEvent() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const createClubEvent = useClubEventsStore((state) => state.createClubEvent);

  const loading = useClubEventsStore((state) => state.loading);

  const [error, setError] = useState<string | null>(null);

  const handleCreateEvent = async (values: EventFormValues): Promise<void> => {
    setError(null);

    const registrationUrl = values.registrationUrl.trim();

    try {
      await createClubEvent({
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

        imageUrl:
          values.imagePreview && !values.imagePreview.startsWith("blob:")
            ? values.imagePreview
            : undefined,
      });

      navigate("/organizer/events", {
        replace: true,
      });
    } catch (caughtError) {
      console.error("CREATE EVENT ERROR:", caughtError);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : t("createEventPage.error", {
              defaultValue: "The event could not be created.",
            }),
      );
    }
  };

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {t("createEventPage.title", {
            defaultValue: "Create event",
          })}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {t("createEventPage.subtitle", {
            defaultValue:
              "Add an event and make it available through Keiju Club.",
          })}
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive"
          >
            {error}
          </div>
        )}

        <div className="mt-6">
          <EventForm
            submitLabel={t("eventForm.create", {
              defaultValue: "Create event",
            })}
            submitting={loading}
            onSubmit={handleCreateEvent}
          />
        </div>
      </section>
    </OrganizerLayout>
  );
}
