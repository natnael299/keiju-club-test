import { BedSingle } from "lucide-react";

import DailyBarChart from "@/components/charts/DailyBarChart";
import Card from "@/components/shared/Card";

const outOfBedData = [
  { label: "Mon", count: 1 },
  { label: "Tue", count: 2 },
  { label: "Wed", count: 1 },
  { label: "Thu", count: 4 },
  { label: "Fri", count: 3 },
  { label: "Sat", count: 2 },
  { label: "Sun", count: 5 },
];

export default function OutOfBedHistoryWidget() {
  return (
    <Card className="p-4">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BedSingle className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-extrabold text-foreground">
              Out-of-bed history
            </h2>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Nighttime bed exits during the past week
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-extrabold text-primary">5</p>
          <p className="text-xs text-muted-foreground">Latest night</p>
        </div>
      </div>

      <DailyBarChart data={outOfBedData} />
    </Card>
  );
}
