import { ChevronRight, ClipboardPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";

export default function WeeklyReport() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openReports = () => {
    navigate("/app/reports");
  };

  return (
    <section className="mt-8">
      <SectionHeader
        title={t("home.weeklyReport")}
        actionLabel={t("home.open")}
        onActionClick={openReports}
      />

      <button
        type="button"
        onClick={openReports}
        className="block w-full text-left"
        aria-label={t("home.openWeeklyReport")}
      >
        <Card className="transition hover:bg-muted/30 active:scale-[0.99]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-primary/10 p-3">
                <ClipboardPlus className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-foreground">
                  {t("home.weeklySummary")}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {t("home.weeklySummaryDescription")}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </div>
        </Card>
      </button>
    </section>
  );
}
