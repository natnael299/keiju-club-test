import { useTranslation } from "react-i18next";

export default function OrganizerEventsHeader() {
  const { t } = useTranslation();

  return (
    <section className="mb-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        {t("organizer.eventsTitle")}
      </h1>

      <p className="mt-2 text-base text-muted-foreground">
        {t("organizer.eventsSubtitle")}
      </p>
    </section>
  );
}
