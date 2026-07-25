import { ChevronRight, ClipboardPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";

export default function WeeklyReport() {
  const navigate = useNavigate();

  return (
    <section className="mb-8">
      <SectionHeader
        title="Weekly Report"
        actionLabel="Open"
        onActionClick={() => navigate("/app/reports")}
      />

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-primary/10 p-3">
              <ClipboardPlus className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h3 className="font-bold">Nurse Weekly Summary</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                View this week's observations and health summary.
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </Card>
    </section>
  );
}
