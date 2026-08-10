import { CheckCircle2, ClipboardList, MessageSquareText } from "lucide-react";

import Card from "@/components/shared/Card";
import type { WeeklyReport } from "@/types";

type Props = {
  report: WeeklyReport | null;
};

export default function LatestReport({ report }: Props) {
  if (!report) {
    return (
      <section>
        <h2 className="text-xl font-extrabold text-foreground">
          Viimeisin raportti
        </h2>

        <Card className="mt-4">
          <p className="text-sm text-muted-foreground">
            Raporttia ei ole vielä saatavilla.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-extrabold text-foreground">
        Viimeisin raportti
      </h2>

      <Card className="mt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <ClipboardList className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-extrabold text-primary">
                  Viikko {report.week}
                </h3>

                <StatusBadge status={report.status} />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {formatDateRange(report.startDate, report.endDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            Viikkoyhteenveto
          </h4>

          <p className="mt-3 text-base leading-7 text-foreground">
            {report.summary}
          </p>
        </div>

        {report.observations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
              Keskeiset huomiot
            </h4>

            <div className="mt-3 space-y-3">
              {report.observations.map((observation, index) => (
                <div
                  key={`${report.id}-${index}`}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-white" />

                  <p className="text-sm leading-6 text-foreground">
                    {observation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {report.recommendation && (
          <div className="mt-6 rounded-2xl bg-accent/40 p-4">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-primary" />

              <h4 className="text-sm font-extrabold text-primary">Suositus</h4>
            </div>

            <p className="mt-2 text-sm leading-6 text-foreground">
              {report.recommendation}
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}

function StatusBadge({ status }: { status: WeeklyReport["status"] }) {
  if (status === "stable") {
    return (
      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
        Vakaa
      </span>
    );
  }

  if (status === "attention") {
    return (
      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
        Seurattava
      </span>
    );
  }

  return (
    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
      Huomio
    </span>
  );
}

function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return `${formatter.format(
    new Date(`${startDate}T00:00:00`),
  )} – ${formatter.format(new Date(`${endDate}T00:00:00`))}`;
}
