import { useState } from "react";

import type { TFunction } from "i18next";

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

      setError(getLocalizedError(caughtError, t));
    }
  };

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {t("createEventPage.title")}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {t("createEventPage.subtitle")}
        </p>

        <div className="mt-6">
          <EventForm
            submitLabel={t("eventForm.create")}
            submitting={loading}
            error={error}
            onSubmit={handleCreateEvent}
          />
        </div>
      </section>
    </OrganizerLayout>
  );
}

function getLocalizedError(error: unknown, t: TFunction): string {
  if (
    error instanceof Error &&
    error.message === "The event end date must be after its start date."
  ) {
    return t("createEventPage.invalidDateRange");
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return t("createEventPage.error");
}
