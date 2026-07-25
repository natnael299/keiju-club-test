import { BedDouble } from "lucide-react";

import TrendLineChart from "@/components/charts/TrendLineChart";
import Card from "@/components/shared/Card";

const sleepData = [
  { label: "Mon", value: 6.2 },
  { label: "Tue", value: 7.1 },
  { label: "Wed", value: 5.8 },
  { label: "Thu", value: 6.6 },
  { label: "Fri", value: 6.1 },
  { label: "Sat", value: 7.4 },
  { label: "Sun", value: 6.5 },
];

export default function SleepHistoryWidget() {
  return (
    <Card className="p-4">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-extrabold text-foreground">
              Sleep history
            </h2>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Sleep duration during the past seven nights
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-extrabold text-primary">6.5 h</p>
          <p className="text-xs text-muted-foreground">Average</p>
        </div>
      </div>

      <TrendLineChart data={sleepData} valueSuffix=" h" />
    </Card>
  );
}
