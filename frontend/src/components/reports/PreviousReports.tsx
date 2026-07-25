import { CalendarDays, ChevronRight } from "lucide-react";
import Card from "@/components/shared/Card";

const reports = [
  { week: "Viikko 21", range: "15.6.–21.6.2026" },
  { week: "Viikko 20", range: "8.6.–14.6.2026" },
  { week: "Viikko 19", range: "1.6.–7.6.2026" },
];

export default function PreviousReports() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-extrabold text-primary">
        Aiemmat raportit
      </h2>

      <Card className="overflow-hidden p-0">
        {reports.map((report, index) => (
          <button
            key={report.week}
            type="button"
            className={[
              "flex w-full items-center justify-between px-4 py-4 text-left",
              index !== reports.length - 1 ? "border-b border-border" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-accent/60 p-3">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-extrabold text-foreground">
                  {report.week}
                </h3>
                <p className="text-sm text-muted-foreground">{report.range}</p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        ))}
      </Card>
    </section>
  );
}
