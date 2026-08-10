import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MessageSquareText,
} from "lucide-react";

import Card from "@/components/shared/Card";
import type { WeeklyReport } from "@/types";

type Props = {
  reports: WeeklyReport[];
};

export default function PreviousReports({ reports }: Props) {
  const [openReportIds, setOpenReportIds] = useState<string[]>([]);

  const toggleReport = (reportId: string) => {
    setOpenReportIds((current) =>
      current.includes(reportId)
        ? current.filter((id) => id !== reportId)
        : [...current, reportId],
    );
  };

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-extrabold text-foreground">
        Aiemmat raportit
      </h2>

      {reports.length === 0 ? (
        <Card>
          <p className="text-sm text-muted-foreground">
            Aiemmat raportit eivät ole vielä saatavilla.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          {reports.map((report, index) => {
            const isOpen = openReportIds.includes(report.id);

            return (
              <div
                key={report.id}
                className={
                  index !== reports.length - 1 ? "border-b border-border" : ""
                }
              >
                <button
                  type="button"
                  onClick={() => toggleReport(report.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-muted/30 sm:px-5"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="shrink-0 rounded-2xl bg-accent/60 p-3">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-foreground">
                          Viikko {report.week}
                        </h3>

                        <StatusBadge status={report.status} />
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDateRange(report.startDate, report.endDate)}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-border bg-background/40 px-4 pb-5 pt-5 sm:px-5">
                    <div>
                      <h4 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                        Viikkoyhteenveto
                      </h4>

                      <p className="mt-3 text-sm leading-6 text-foreground">
                        {report.summary}
                      </p>
                    </div>

                    {report.observations.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                          Keskeiset huomiot
                        </h4>

                        <div className="mt-3 space-y-3">
                          {report.observations.map(
                            (observation, observationIndex) => (
                              <div
                                key={`${report.id}-${observationIndex}`}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-primary text-white" />

                                <p className="text-sm leading-6 text-foreground">
                                  {observation}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {report.recommendation && (
                      <div className="mt-5 rounded-2xl bg-accent/40 p-4">
                        <div className="flex items-center gap-2">
                          <MessageSquareText className="h-4 w-4 text-primary" />

                          <h4 className="text-sm font-extrabold text-primary">
                            Suositus
                          </h4>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {report.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </Card>
      )}
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
