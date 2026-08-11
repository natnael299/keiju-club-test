import { CalendarPlus, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";

export default function OrganizerQuickActions() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <button type="button" onClick={() => navigate("/organizer/events/new")}>
        <Card className="flex items-center gap-4 text-left">
          <CalendarPlus className="h-6 w-6 text-primary" />

          <div>
            <h3 className="font-extrabold">{t("organizer.createEvent")}</h3>

            <p className="text-sm text-muted-foreground">
              {t("organizer.createEventDescription")}
            </p>
          </div>
        </Card>
      </button>

      <button type="button" onClick={() => navigate("/organizer/events")}>
        <Card className="flex items-center gap-4 text-left">
          <ListChecks className="h-6 w-6 text-primary" />

          <div>
            <h3 className="font-extrabold">{t("organizer.manageEvents")}</h3>

            <p className="text-sm text-muted-foreground">
              {t("organizer.manageEventsDescription")}
            </p>
          </div>
        </Card>
      </button>
    </section>
  );
}
