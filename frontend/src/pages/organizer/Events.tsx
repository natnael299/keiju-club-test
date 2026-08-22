import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import OrganizerEventRow from "@/components/organizer/OrganizerEventRow";
import OrganizerEventsHeader from "@/components/organizer/OrganizerEventsHeader";
import LoadError from "@/components/shared/LoadError";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useClubEventsStore } from "@/store/clubEvents.store";

export default function OrganizerEvents() {
  const { t } = useTranslation();

  const events = useClubEventsStore((state) => state.clubEvents);

  const loading = useClubEventsStore((state) => state.loading);

  const error = useClubEventsStore((state) => state.error);

  const fetchOrganizationClubEvents = useClubEventsStore(
    (state) => state.fetchOrganizationClubEvents,
  );

  useEffect(() => {
    void fetchOrganizationClubEvents();
  }, [fetchOrganizationClubEvents]);

  return (
    <OrganizerLayout>
      <OrganizerEventsHeader />

      {loading && events.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("organizerEvents.loading", {
            defaultValue: "Loading events...",
          })}
        </p>
      ) : error ? (
        <LoadError
          title={t("organizerEvents.loadError", {
            defaultValue: "Events could not be loaded",
          })}
          message={error}
          retrying={loading}
          onRetry={fetchOrganizationClubEvents}
        />
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-6 text-center">
          <p className="font-semibold text-foreground">
            {t("organizerEvents.emptyTitle", {
              defaultValue: "No events found",
            })}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {t("organizerEvents.emptyDescription", {
              defaultValue:
                "Create your first event to make it available in Keiju Club.",
            })}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <OrganizerEventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </OrganizerLayout>
  );
}
