import { useTranslation } from "react-i18next";

export default function ProfileHeader() {
  const { t } = useTranslation();

  return (
    <section className="mb-6">
      <h1 className="text-4xl font-extrabold text-foreground">
        {t("profile.title")}
      </h1>
    </section>
  );
}
