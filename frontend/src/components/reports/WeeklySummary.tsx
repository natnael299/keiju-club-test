import { Moon, Sun, Utensils } from "lucide-react";
import StatCard from "@/components/reports/StatCard";

export default function WeeklySummary() {
  return (
    <section className="mb-7 rounded-3xl bg-accent/35 p-5 shadow-sm">
      <h2 className="text-2xl font-extrabold text-foreground">Yhteenveto</h2>
      <p className="mt-1 text-base font-medium text-foreground">
        Tämän viikon lyhyesti
      </p>

      <div className="mt-7 grid grid-cols-3 gap-3">
        <StatCard icon={Moon} value="6,5 h" label="Unen keskiarvo" />
        <StatCard icon={Utensils} value="5 / 7" label="Keittiöaktiivisuus" />
        <StatCard icon={Sun} value="Hyvä" label="Aamurutiinit" />
      </div>
    </section>
  );
}
