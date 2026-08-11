import { useTranslation } from "react-i18next";

export default function AlertsHeader() {
  const { t } = useTranslation();

  return (
    <section className="mb-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        {t("alertsPage.title")}
      </h1>

      <p className="mt-2 text-base text-muted-foreground">
        {t("alertsPage.subtitle")}
      </p>
    </section>
  );
}
