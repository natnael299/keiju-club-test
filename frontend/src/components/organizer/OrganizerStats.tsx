import { CalendarDays, Eye, Users } from "lucide-react";
import Card from "@/components/shared/Card";

const stats = [
  { label: "Active events", value: "3", icon: CalendarDays },
  { label: "Registrations", value: "42", icon: Users },
  { label: "Views", value: "186", icon: Eye },
];

export default function OrganizerStats() {
  return (
    <section className="mb-7 grid grid-cols-3 gap-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="px-3 py-4 text-center">
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
