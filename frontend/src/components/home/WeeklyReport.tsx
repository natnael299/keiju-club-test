import { ChevronRight, ClipboardPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";

export default function WeeklyReport() {
  const navigate = useNavigate();

  const openReports = () => {
    navigate("/app/reports");
  };

  return (
    <section>
      <SectionHeader
        title="Weekly Report"
        actionLabel="Open"
        onActionClick={openReports}
      />

      <button
        type="button"
        onClick={openReports}
        className="block w-full text-left"
        aria-label="Open this week's nurse report"
      >
        <Card className="transition hover:bg-muted/30 active:scale-[0.99]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-primary/10 p-3">
                <ClipboardPlus className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-foreground">
                  Nurse Weekly Summary
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  View this week's observations and health summary.
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
