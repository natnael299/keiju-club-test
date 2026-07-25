import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DailyCountPoint = {
  label: string;
  count: number;
};

type DailyBarChartProps = {
  data: DailyCountPoint[];
};

export default function DailyBarChart({ data }: DailyBarChartProps) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value) => [value, "Count"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />

          <Bar
            dataKey="count"
            fill="var(--primary)"
            radius={[8, 8, 0, 0]}
            maxBarSize={34}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
