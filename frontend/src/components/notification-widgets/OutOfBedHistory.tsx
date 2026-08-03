import { useMemo, useState } from "react";
import {
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Footprints,
  Timer,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/shared/Card";
import type { Notification } from "@/types";

type RangeMode = "day" | "week" | "month";

type BedExit = {
  id: number;
  leftBedAt: string;
  returnedAt: string;
  durationMinutes: number;
  position: number;
};

type OutOfBedDay = {
  date: string;
  bedtime: string;
  wakeTime: string;
  exits: BedExit[];
  totalOutOfBedMinutes: number;
  longestExitMinutes: number;
};

type ChartDay = OutOfBedDay & {
  label: string;
  exitCount: number;
};

type OutOfBedHistoryProps = {
  notification: Notification;
};

const DAY_MS = 86_400_000;
const today = startOfDay(new Date());

const outOfBedHistory = createOutOfBedHistory(190);

export default function OutOfBedHistory({
  notification,
}: OutOfBedHistoryProps) {
  const notificationDate = startOfDay(new Date(notification.dt));

  const [mode, setMode] = useState<RangeMode>("day");
  const [anchorDate, setAnchorDate] = useState(notificationDate);

  const selectedData = useMemo(
    () => getSelectedData(outOfBedHistory, anchorDate, mode),
    [anchorDate, mode],
  );

  const activeDay =
    selectedData.find((day) => day.date === toDateKey(anchorDate)) ??
    selectedData[selectedData.length - 1];

  const totalExits = useMemo(
    () => selectedData.reduce((total, day) => total + day.exits.length, 0),
    [selectedData],
  );

  const totalOutOfBedMinutes = useMemo(
    () =>
      selectedData.reduce((total, day) => total + day.totalOutOfBedMinutes, 0),
    [selectedData],
  );

  const longestExitMinutes = useMemo(
    () => Math.max(0, ...selectedData.map((day) => day.longestExitMinutes)),
    [selectedData],
  );

  const averageExits =
    selectedData.length > 0 ? totalExits / selectedData.length : 0;

  const averageMinutes =
    selectedData.length > 0 ? totalOutOfBedMinutes / selectedData.length : 0;

  const canGoForward =
    endOfPeriod(anchorDate, mode).getTime() < today.getTime();

  const changeMode = (nextMode: RangeMode) => {
    setMode(nextMode);
    setAnchorDate(notificationDate);
  };

  const movePeriod = (direction: -1 | 1) => {
    if (direction === 1 && !canGoForward) {
      return;
    }

    setAnchorDate((currentDate) => shiftPeriod(currentDate, mode, direction));
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="space-y-5 p-4 sm:p-6">
        <Header
          mode={mode}
          activeDay={activeDay}
          averageExits={averageExits}
          averageMinutes={averageMinutes}
        />

        <RangeSelector mode={mode} onChange={changeMode} />

        <PeriodNavigation
          mode={mode}
          anchorDate={anchorDate}
          canGoForward={canGoForward}
          onPrevious={() => movePeriod(-1)}
          onNext={() => movePeriod(1)}
        />

        {mode === "day" ? (
          <DayView day={activeDay} />
        ) : (
          <TrendView
            data={selectedData}
            mode={mode}
            totalExits={totalExits}
            totalMinutes={totalOutOfBedMinutes}
            longestExitMinutes={longestExitMinutes}
          />
        )}
      </div>
    </Card>
  );
}

function Header({
  mode,
  activeDay,
  averageExits,
  averageMinutes,
}: {
  mode: RangeMode;
  activeDay?: OutOfBedDay;
  averageExits: number;
  averageMinutes: number;
}) {
  const exitCount = activeDay?.exits.length ?? 0;

  const outOfBedMinutes = activeDay?.totalOutOfBedMinutes ?? 0;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <BedDouble className="h-6 w-6 shrink-0 text-primary" />

          <h2 className="text-xl font-extrabold text-foreground">Out of bed</h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Times the user left the bed and how long it took to return
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-lg font-extrabold text-primary sm:text-xl">
          {mode === "day"
            ? `${exitCount} ${exitCount === 1 ? "exit" : "exits"}`
            : `Avg ${averageExits.toFixed(1)} exits`}
        </p>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {mode === "day"
            ? `${outOfBedMinutes} min out of bed`
            : `Avg ${Math.round(averageMinutes)} min`}
        </p>
      </div>
    </div>
  );
}

function RangeSelector({
  mode,
  onChange,
}: {
  mode: RangeMode;
  onChange: (mode: RangeMode) => void;
}) {
  const options: RangeMode[] = ["day", "week", "month"];

  return (
    <div className="grid grid-cols-3 rounded-2xl bg-[#f2eadb] p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={mode === option}
          className={`rounded-xl px-3 py-2.5 text-sm font-bold capitalize transition ${
            mode === option
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function PeriodNavigation({
  mode,
  anchorDate,
  canGoForward,
  onPrevious,
  onNext,
}: {
  mode: RangeMode;
  anchorDate: Date;
  canGoForward: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrevious}
        aria-label={`Previous ${mode}`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eadfce] bg-white text-foreground transition hover:bg-[#faf7f1]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <p className="min-w-0 text-center text-base font-extrabold text-foreground sm:text-lg">
        {formatPeriodLabel(anchorDate, mode)}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoForward}
        aria-label={`Next ${mode}`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eadfce] bg-white text-foreground transition hover:bg-[#faf7f1] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function DayView({ day }: { day?: OutOfBedDay }) {
  if (!day) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl bg-muted/50 text-sm text-muted-foreground">
        No bed activity is available for this day.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DaySummary day={day} />

      <BedPresenceTimeline day={day} />

      <ExitList day={day} />
    </div>
  );
}

function DaySummary({ day }: { day: OutOfBedDay }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard
        icon={<Clock3 className="h-5 w-5" />}
        label="Bedtime"
        value={day.bedtime}
      />

      <SummaryCard
        icon={<Footprints className="h-5 w-5" />}
        label="Bed exits"
        value={`${day.exits.length}`}
      />

      <SummaryCard
        icon={<Timer className="h-5 w-5" />}
        label="Time out of bed"
        value={`${day.totalOutOfBedMinutes} min`}
        supportingText={`Longest ${day.longestExitMinutes} min`}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  supportingText,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  supportingText?: string;
}) {
  return (
    <div className="rounded-2xl bg-[#e4f3eb] p-4">
      <div className="text-primary">{icon}</div>

      <p className="mt-3 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-xl font-extrabold text-foreground">{value}</p>

      {supportingText && (
        <p className="mt-0.5 text-sm text-muted-foreground">{supportingText}</p>
      )}
    </div>
  );
}

function BedPresenceTimeline({ day }: { day: OutOfBedDay }) {
  const bedtimeMinutes = parseClock(day.bedtime);

  const wakeTimeMinutes = normalizeEndTime(
    bedtimeMinutes,
    parseClock(day.wakeTime),
  );

  const totalPeriodMinutes = wakeTimeMinutes - bedtimeMinutes;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-foreground">Bed presence</h3>

          <p className="text-sm text-muted-foreground">
            Green shows time in bed. Peach shows time out of bed.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{day.bedtime}</span>
        <span>{day.wakeTime}</span>
      </div>

      <div className="relative mt-3 pt-10">
        <div className="absolute inset-x-0 top-0 h-10">
          {day.exits.map((exit) => (
            <div
              key={exit.id}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{
                left: `${exit.position}%`,
              }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d89161] text-xs font-extrabold text-white">
                {exit.id}
              </span>

              <span className="h-3 w-px bg-[#d89161]" />
            </div>
          ))}
        </div>

        <div className="relative h-16 overflow-hidden rounded-2xl bg-[#346f59]">
          {day.exits.map((exit) => {
            const width = Math.max(
              (exit.durationMinutes / totalPeriodMinutes) * 100,
              0.8,
            );

            return (
              <div
                key={exit.id}
                className="absolute inset-y-0 bg-[#efc4a7]"
                style={{
                  left: `${exit.position}%`,
                  width: `${width}%`,
                  transform: "translateX(-50%)",
                }}
                title={`${exit.leftBedAt}–${exit.returnedAt}, ${exit.durationMinutes} min out of bed`}
              />
            );
          })}
        </div>
      </div>

      <TimelineTicks
        startMinutes={bedtimeMinutes}
        totalMinutes={totalPeriodMinutes}
      />

      <div className="mt-4 flex flex-wrap gap-5">
        <LegendItem className="bg-[#346f59]" label="In bed" />

        <LegendItem className="bg-[#efc4a7]" label="Out of bed" />
      </div>
    </div>
  );
}

function TimelineTicks({
  startMinutes,
  totalMinutes,
}: {
  startMinutes: number;
  totalMinutes: number;
}) {
  const tickCount = 8;

  const ticks = Array.from({ length: tickCount }, (_, index) => {
    const position = (index / (tickCount - 1)) * 100;

    return {
      position,
      label: formatClock(
        startMinutes + Math.round((position / 100) * totalMinutes),
      ),
    };
  });

  return (
    <div className="relative mt-2 h-5">
      {ticks.map((tick, index) => (
        <span
          key={`${tick.label}-${index}`}
          className={`absolute text-[11px] text-muted-foreground ${
            index === 0
              ? ""
              : index === ticks.length - 1
                ? "-translate-x-full"
                : "-translate-x-1/2"
          }`}
          style={{
            left: `${tick.position}%`,
          }}
        >
          {tick.label}
        </span>
      ))}
    </div>
  );
}

function ExitList({ day }: { day: OutOfBedDay }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-extrabold text-foreground">Out-of-bed events</h3>

        <p className="text-sm text-muted-foreground">
          {day.totalOutOfBedMinutes} min total
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {day.exits.map((exit) => (
          <div
            key={exit.id}
            className="flex items-center gap-3 rounded-xl bg-[#faf7f1] p-3"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e2ad86] bg-white text-xs font-extrabold text-[#b96f3e]">
              {exit.id}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-foreground">
                {exit.leftBedAt} – {exit.returnedAt}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Returned after {exit.durationMinutes} min
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendView({
  data,
  mode,
  totalExits,
  totalMinutes,
  longestExitMinutes,
}: {
  data: OutOfBedDay[];
  mode: Exclude<RangeMode, "day">;
  totalExits: number;
  totalMinutes: number;
  longestExitMinutes: number;
}) {
  const chartData: ChartDay[] = data.map((day) => ({
    ...day,
    label: formatChartLabel(day.date, mode),
    exitCount: day.exits.length,
  }));

  if (!chartData.length) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl bg-muted/50 text-sm text-muted-foreground">
        No bed activity is available for this period.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-center gap-6">
        <LegendItem className="bg-primary" label="Times out of bed" />

        <LegendItem className="bg-[#efb184]" label="Minutes out of bed" />
      </div>

      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 18,
              right: 10,
              left: -12,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval={mode === "month" ? 4 : 0}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
            />

            <YAxis
              yAxisId="exits"
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={32}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
            />

            <YAxis
              yAxisId="minutes"
              orientation="right"
              axisLine={false}
              tickLine={false}
              width={36}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
              tickFormatter={(value) => `${value}m`}
            />

            <Tooltip content={<OutOfBedTooltip />} />

            <Bar
              yAxisId="exits"
              dataKey="exitCount"
              fill="var(--primary)"
              radius={[5, 5, 0, 0]}
              maxBarSize={mode === "week" ? 40 : 14}
            />

            <Line
              yAxisId="minutes"
              type="monotone"
              dataKey="totalOutOfBedMinutes"
              stroke="#efb184"
              strokeWidth={2.5}
              dot={{
                r: mode === "week" ? 5 : 3,
                fill: "#efb184",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "#efb184",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-[#e9f5ef]">
        <TrendSummary label="Total exits" value={`${totalExits}`} />

        <TrendSummary
          label="Total time"
          value={`${totalMinutes} min`}
          withBorder
        />

        <TrendSummary
          label="Longest exit"
          value={`${longestExitMinutes} min`}
          withBorder
        />
      </div>
    </div>
  );
}

function TrendSummary({
  label,
  value,
  withBorder = false,
}: {
  label: string;
  value: string;
  withBorder?: boolean;
}) {
  return (
    <div className={`p-4 ${withBorder ? "border-l border-white" : ""}`}>
      <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>

      <p className="mt-1 text-lg font-extrabold text-primary sm:text-xl">
        {value}
      </p>
    </div>
  );
}

function OutOfBedTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: ChartDay;
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const day = payload[0].payload;

  return (
    <div className="min-w-48 rounded-2xl border border-[#eadfce] bg-white p-3 shadow-lg">
      <p className="text-sm font-extrabold text-foreground">
        {formatFullDate(parseDate(day.date))}
      </p>

      <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
        <TooltipRow label="Times out of bed" value={`${day.exitCount}`} />

        <TooltipRow
          label="Total time"
          value={`${day.totalOutOfBedMinutes} min`}
        />

        <TooltipRow
          label="Longest exit"
          value={`${day.longestExitMinutes} min`}
        />
      </div>
    </div>
  );
}

function TooltipRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex justify-between gap-4">
      <span>{label}</span>

      <strong className="text-foreground">{value}</strong>
    </p>
  );
}

function LegendItem({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className={`h-3 w-3 rounded-full ${className}`} />

      <span>{label}</span>
    </div>
  );
}

function createOutOfBedHistory(numberOfDays: number): OutOfBedDay[] {
  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = new Date(
      today.getTime() - (numberOfDays - index - 1) * DAY_MS,
    );

    const bedtimeMinutes = 22 * 60 + 15 + ((index * 13) % 55);

    const sleepPeriodMinutes = 450 + Math.round(Math.sin(index * 0.31) * 30);

    const exitCount = clamp(
      1 +
        Math.round(Math.abs(Math.sin(index * 0.73)) * 4) +
        (index % 19 === 0 ? 1 : 0),
      1,
      6,
    );

    const exits = createBedExits(
      exitCount,
      bedtimeMinutes,
      sleepPeriodMinutes,
      index,
    );

    const totalOutOfBedMinutes = exits.reduce(
      (total, exit) => total + exit.durationMinutes,
      0,
    );

    const longestExitMinutes = Math.max(
      ...exits.map((exit) => exit.durationMinutes),
    );

    return {
      date: toDateKey(date),
      bedtime: formatClock(bedtimeMinutes),
      wakeTime: formatClock(bedtimeMinutes + sleepPeriodMinutes),
      exits,
      totalOutOfBedMinutes,
      longestExitMinutes,
    };
  });
}

function createBedExits(
  count: number,
  bedtimeMinutes: number,
  sleepPeriodMinutes: number,
  seed: number,
): BedExit[] {
  return Array.from({ length: count }, (_, index) => {
    const basePosition = ((index + 1) / (count + 1)) * 100;

    const position = clamp(
      Number((basePosition + Math.sin((seed + index) * 1.5) * 4).toFixed(1)),
      6,
      94,
    );

    const durationMinutes = clamp(4 + ((seed * 9 + index * 13) % 27), 4, 30);

    const leftBedMinutes =
      bedtimeMinutes + Math.round((position / 100) * sleepPeriodMinutes);

    return {
      id: index + 1,
      leftBedAt: formatClock(leftBedMinutes),
      returnedAt: formatClock(leftBedMinutes + durationMinutes),
      durationMinutes,
      position,
    };
  }).sort((first, second) => first.position - second.position);
}

function getSelectedData(
  data: OutOfBedDay[],
  anchorDate: Date,
  mode: RangeMode,
) {
  const start = startOfPeriod(anchorDate, mode).getTime();

  const end = endOfPeriod(anchorDate, mode).getTime();

  return data.filter((day) => {
    const date = parseDate(day.date).getTime();

    return date >= start && date <= end;
  });
}

function startOfPeriod(date: Date, mode: RangeMode) {
  const result = startOfDay(date);

  if (mode === "week") {
    const weekday = result.getDay();

    const offset = weekday === 0 ? -6 : 1 - weekday;

    result.setDate(result.getDate() + offset);
  }

  if (mode === "month") {
    result.setDate(1);
  }

  return result;
}

function endOfPeriod(date: Date, mode: RangeMode) {
  const result = startOfPeriod(date, mode);

  if (mode === "week") {
    result.setDate(result.getDate() + 6);
  }

  if (mode === "month") {
    result.setMonth(result.getMonth() + 1, 0);
  }

  return result;
}

function shiftPeriod(date: Date, mode: RangeMode, direction: -1 | 1) {
  const result = new Date(date);

  if (mode === "day") {
    result.setDate(result.getDate() + direction);
  }

  if (mode === "week") {
    result.setDate(result.getDate() + direction * 7);
  }

  if (mode === "month") {
    result.setMonth(result.getMonth() + direction);
  }

  return startOfDay(result);
}

function formatPeriodLabel(date: Date, mode: RangeMode) {
  if (mode === "day") {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  if (mode === "month") {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  const start = startOfPeriod(date, "week");

  const end = endOfPeriod(date, "week");

  const startLabel = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(start);

  const endLabel = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(end);

  return `${startLabel} – ${endLabel}`;
}

function formatChartLabel(dateKey: string, mode: "week" | "month") {
  const date = parseDate(dateKey);

  if (mode === "week") {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
      day: "numeric",
    }).format(date);
  }

  return `${date.getDate()}`;
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function normalizeEndTime(startMinutes: number, endMinutes: number) {
  return endMinutes <= startMinutes ? endMinutes + 24 * 60 : endMinutes;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();

  const month = `${date.getMonth() + 1}`.padStart(2, "0");

  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseClock(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatClock(totalMinutes: number) {
  const minutesInDay = 24 * 60;

  const normalized =
    ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;

  const hours = Math.floor(normalized / 60);

  const minutes = normalized % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
