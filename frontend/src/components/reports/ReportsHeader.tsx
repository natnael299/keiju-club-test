import { useTranslation } from "react-i18next";

export default function ReportsHeader() {
  const { t } = useTranslation();

  return (
    <section className="mb-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        {t("reportsPage.title")}
      </h1>
    </section>
  );
}
