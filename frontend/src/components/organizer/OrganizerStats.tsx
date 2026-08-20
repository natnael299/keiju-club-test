import { CalendarDays, ListChecks } from "lucide-react";

import Card from "@/components/shared/Card";

type Props = {
  activeEvents: number;
  totalEvents: number;
};

export default function OrganizerStats({ activeEvents, totalEvents }: Props) {
  const stats = [
    {
      label: "Active events",
      value: activeEvents,
      icon: CalendarDays,
    },
    {
      label: "Total events",
      value: totalEvents,
      icon: ListChecks,
    },
  ];

  return (
    <section className="mb-7 grid grid-cols-2 gap-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="px-4 py-5 text-center">
          <Icon className="mx-auto h-5 w-5 text-primary" />

          <p className="mt-3 text-2xl font-extrabold text-foreground">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </Card>
      ))}
    </section>
  );
}
