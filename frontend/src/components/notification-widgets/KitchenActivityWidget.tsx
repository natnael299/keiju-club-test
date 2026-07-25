import { Check, Utensils, X } from "lucide-react";

import Card from "@/components/shared/Card";

const activity = [
  { day: "Ma", active: true },
  { day: "Ti", active: true },
  { day: "Ke", active: false },
  { day: "To", active: true },
  { day: "Pe", active: true },
  { day: "La", active: false },
  { day: "Su", active: true },
];

export default function KitchenActivityWidget() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Utensils className="h-5 w-5 text-primary" />

        <h3 className="text-lg font-extrabold text-foreground">
          Keittiöaktiivisuus
        </h3>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Havaittu aktiivisuus viimeisen seitsemän päivän aikana
      </p>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {activity.map((item) => (
          <div key={item.day} className="text-center">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              {item.day}
            </p>

            <div
              className={[
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {item.active ? <Check size={17} /> : <X size={17} />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-primary/10 p-3">
        <p className="text-xs font-bold uppercase text-primary">
          Viimeisin havainto
        </p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          Tänään klo 08.12
        </p>
      </div>
    </Card>
  );
}
