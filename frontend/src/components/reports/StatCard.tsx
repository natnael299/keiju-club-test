import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export default function StatCard({ icon: Icon, value, label }: Props) {
  return (
    <div className="rounded-2xl bg-white px-3 py-4 text-center shadow-sm">
      <Icon className="mx-auto h-6 w-6 text-primary" />
      <p className="mt-3 text-xl font-extrabold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
