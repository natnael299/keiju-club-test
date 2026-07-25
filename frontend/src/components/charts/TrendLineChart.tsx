import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type TrendDataPoint = {
  label: string;
  value: number;
};

type TrendLineChartProps = {
  data: TrendDataPoint[];
  valueSuffix?: string;
};

export default function TrendLineChart({
  data,
  valueSuffix = "",
}: TrendLineChartProps) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value) => [`${value}${valueSuffix}`, "Value"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--card)",
              stroke: "var(--primary)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
