import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  AlarmClock,
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
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/shared/Card";
import type { Notification } from "@/types";

type RangeMode = "day" | "week" | "month";

type ActivityPeriod = {
  id: number;
  start: string;
  end: string;
  durationMinutes: number;
  startPosition: number;
  width: number;
};

type MorningActivityDay = {
  date: string;
  firstMovementAt: string | null;
  usualFirstMovementAt: string;
  delayMinutes: number;
  activityMinutes: number;
  usualActivityMinutes: number;
  activityDifferencePercent: number;
  alertTriggered: boolean;
  activityPeriods: ActivityPeriod[];
  usualActivityPeriods: ActivityPeriod[];
};

type MorningChartDay = MorningActivityDay & {
  label: string;
};

type MorningActivityWidgetProps = {
  notification: Notification;
};

const DAY_MS = 86_400_000;
const MORNING_START = 6 * 60;
const MORNING_END = 12 * 60;
const USUAL_FIRST_MOVEMENT = 7 * 60 + 8;
const USUAL_ACTIVITY_MINUTES = 47;

const today = startOfDay(new Date());

const morningActivityHistory = createMorningActivityHistory(190);

export default function MorningActivityWidget({
  notification,
}: MorningActivityWidgetProps) {
  const notificationDate = startOfDay(new Date(notification.dt));

  const [mode, setMode] = useState<RangeMode>("day");

  const [anchorDate, setAnchorDate] = useState(notificationDate);

  const selectedData = useMemo(
    () => getSelectedData(morningActivityHistory, anchorDate, mode),
    [anchorDate, mode],
  );

  const activeDay =
    selectedData.find((day) => day.date === toDateKey(anchorDate)) ??
    selectedData[selectedData.length - 1];

  const averageActivityMinutes =
    selectedData.length > 0
      ? selectedData.reduce((sum, day) => sum + day.activityMinutes, 0) /
        selectedData.length
      : 0;

  const averageFirstMovementMinutes =
    selectedData.length > 0
      ? selectedData.reduce(
          (sum, day) =>
            sum +
            (day.firstMovementAt
              ? parseClock(day.firstMovementAt)
              : MORNING_END),
          0,
        ) / selectedData.length
      : 0;

  const lowActivityDays = selectedData.filter(
    (day) => day.alertTriggered,
  ).length;

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
          averageActivityMinutes={averageActivityMinutes}
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
            lowActivityDays={lowActivityDays}
            averageActivityMinutes={averageActivityMinutes}
            averageFirstMovementMinutes={averageFirstMovementMinutes}
          />
        )}
      </div>
    </Card>
  );
}

function Header({
  mode,
  activeDay,
  averageActivityMinutes,
}: {
  mode: RangeMode;
  activeDay?: MorningActivityDay;
  averageActivityMinutes: number;
}) {
  const difference = activeDay?.activityDifferencePercent ?? 0;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 shrink-0 text-primary" />

          <h2 className="text-xl font-extrabold text-foreground">
            Low morning activity
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Morning movement compared with the usual pattern
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={`text-lg font-extrabold sm:text-xl ${
            mode === "day" && difference < 0 ? "text-[#c76535]" : "text-primary"
          }`}
        >
          {mode === "day"
            ? `${Math.abs(difference)}% ${
                difference < 0 ? "below usual" : "above usual"
              }`
            : `${Math.round(averageActivityMinutes)} min average`}
        </p>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {mode === "day"
            ? `${activeDay?.activityMinutes ?? 0} min detected`
            : "Morning activity"}
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
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eadfce] bg-white transition hover:bg-[#faf7f1]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <p className="text-center text-base font-extrabold text-foreground sm:text-lg">
        {formatPeriodLabel(anchorDate, mode)}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoForward}
        aria-label={`Next ${mode}`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eadfce] bg-white transition hover:bg-[#faf7f1] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function DayView({ day }: { day?: MorningActivityDay }) {
  if (!day) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl bg-muted/50 text-sm text-muted-foreground">
        No morning activity data is available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {day.alertTriggered && (
        <div className="rounded-2xl border border-[#f1c7aa] bg-[#fff4eb] p-4">
          <p className="font-extrabold text-[#a75324]">
            Activity was lower than usual
          </p>

          <p className="mt-1 text-sm text-[#8a654f]">
            Morning movement was {Math.abs(day.activityDifferencePercent)}%
            below the established pattern.
          </p>
        </div>
      )}

      <SummaryGrid day={day} />

      <ActivityComparisonTimeline day={day} />

      <ActivityPeriodList day={day} />
    </div>
  );
}

function SummaryGrid({ day }: { day: MorningActivityDay }) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <SummaryCard
        icon={<AlarmClock className="h-5 w-5" />}
        label="First movement"
        value={day.firstMovementAt ?? "Not detected"}
      />

      <SummaryCard
        icon={<Clock3 className="h-5 w-5" />}
        label="Usual first movement"
        value={day.usualFirstMovementAt}
      />

      <SummaryCard
        icon={<Timer className="h-5 w-5" />}
        label="Delay"
        value={formatMinutes(day.delayMinutes)}
        warning={day.delayMinutes > 30}
      />

      <SummaryCard
        icon={<Footprints className="h-5 w-5" />}
        label="Activity"
        value={`${day.activityMinutes} min`}
        supportingText={`Usual ${day.usualActivityMinutes} min`}
        warning={day.alertTriggered}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  supportingText,
  warning = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  supportingText?: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${warning ? "bg-[#fff0e5]" : "bg-[#e4f3eb]"}`}
    >
      <div className={warning ? "text-[#c76535]" : "text-primary"}>{icon}</div>

      <p className="mt-3 text-sm text-muted-foreground">{label}</p>

      <p
        className={`mt-1 text-xl font-extrabold ${
          warning ? "text-[#b85f30]" : "text-foreground"
        }`}
      >
        {value}
      </p>

      {supportingText && (
        <p className="mt-0.5 text-sm text-muted-foreground">{supportingText}</p>
      )}
    </div>
  );
}

function ActivityComparisonTimeline({ day }: { day: MorningActivityDay }) {
  const usualMarkerPosition =
    ((parseClock(day.usualFirstMovementAt) - MORNING_START) /
      (MORNING_END - MORNING_START)) *
    100;

  const todayMarkerPosition = day.firstMovementAt
    ? ((parseClock(day.firstMovementAt) - MORNING_START) /
        (MORNING_END - MORNING_START)) *
      100
    : null;

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-extrabold text-foreground">
          Morning movement comparison
        </h3>

        <p className="text-sm text-muted-foreground">
          Activity detected between 06:00 and 12:00
        </p>
      </div>

      <div className="space-y-5">
        <TimelineRow
          label="Usual pattern"
          periods={day.usualActivityPeriods}
          markerPosition={usualMarkerPosition}
          markerLabel={day.usualFirstMovementAt}
          muted
        />

        <TimelineRow
          label="Today"
          periods={day.activityPeriods}
          markerPosition={todayMarkerPosition}
          markerLabel={day.firstMovementAt ?? "No movement"}
          warning={day.alertTriggered}
        />
      </div>

      <TimelineTicks />

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
        <LegendItem className="bg-primary" label="Detected movement" />

        <LegendItem className="bg-[#9ebbac]" label="Usual movement" />

        <LegendItem className="bg-[#d97745]" label="Delayed first movement" />
      </div>
    </div>
  );
}

function TimelineRow({
  label,
  periods,
  markerPosition,
  markerLabel,
  muted = false,
  warning = false,
}: {
  label: string;
  periods: ActivityPeriod[];
  markerPosition: number | null;
  markerLabel: string;
  muted?: boolean;
  warning?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-foreground">{label}</p>

        <p
          className={`text-xs ${
            warning ? "font-bold text-[#c76535]" : "text-muted-foreground"
          }`}
        >
          First movement: {markerLabel}
        </p>
      </div>

      <div className="relative h-14 overflow-hidden rounded-2xl bg-[#edf1ed]">
        {periods.map((period) => (
          <div
            key={period.id}
            className={`absolute inset-y-0 rounded-xl ${
              muted ? "bg-[#9ebbac]" : "bg-primary"
            }`}
            style={{
              left: `${period.startPosition}%`,
              width: `${period.width}%`,
            }}
            title={`${period.start}–${period.end}, ${period.durationMinutes} min`}
          />
        ))}

        {markerPosition !== null && (
          <div
            className={`absolute inset-y-0 w-0.5 ${
              warning ? "bg-[#d97745]" : "bg-foreground/50"
            }`}
            style={{
              left: `${clamp(markerPosition, 0, 100)}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function TimelineTicks() {
  const times = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="relative mt-2 h-5">
      {times.map((time, index) => (
        <span
          key={time}
          className={`absolute text-[11px] text-muted-foreground ${
            index === 0
              ? ""
              : index === times.length - 1
                ? "-translate-x-full"
                : "-translate-x-1/2"
          }`}
          style={{
            left: `${(index / (times.length - 1)) * 100}%`,
          }}
        >
          {time}
        </span>
      ))}
    </div>
  );
}

function ActivityPeriodList({ day }: { day: MorningActivityDay }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-extrabold text-foreground">
          Detected activity periods
        </h3>

        <p className="text-sm text-muted-foreground">
          {day.activityMinutes} min total
        </p>
      </div>

      {day.activityPeriods.length === 0 ? (
        <div className="rounded-xl bg-[#fff4eb] p-4 text-sm text-[#a75324]">
          No morning movement was detected.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {day.activityPeriods.map((period) => (
            <div
              key={period.id}
              className="flex items-center gap-3 rounded-xl bg-[#faf7f1] p-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#bdd8ca] bg-white text-xs font-extrabold text-primary">
                {period.id}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-foreground">
                  {period.start} – {period.end}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {period.durationMinutes} min movement
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrendView({
  data,
  mode,
  lowActivityDays,
  averageActivityMinutes,
  averageFirstMovementMinutes,
}: {
  data: MorningActivityDay[];
  mode: Exclude<RangeMode, "day">;
  lowActivityDays: number;
  averageActivityMinutes: number;
  averageFirstMovementMinutes: number;
}) {
  const chartData: MorningChartDay[] = data.map((day) => ({
    ...day,
    label: formatChartLabel(day.date, mode),
  }));

  if (!chartData.length) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl bg-muted/50 text-sm text-muted-foreground">
        No morning activity data is available.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-center gap-6">
        <LegendItem className="bg-primary" label="Actual activity minutes" />

        <LegendItem className="bg-[#efb184]" label="First movement time" />
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
              yAxisId="activity"
              domain={[0, 80]}
              axisLine={false}
              tickLine={false}
              width={34}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
              tickFormatter={(value) => `${value}m`}
            />

            <YAxis
              yAxisId="time"
              orientation="right"
              domain={[MORNING_START, MORNING_END]}
              axisLine={false}
              tickLine={false}
              width={44}
              ticks={[360, 420, 480, 540, 600, 660, 720]}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
              tickFormatter={(value) => formatClock(value)}
            />

            <ReferenceLine
              yAxisId="activity"
              y={USUAL_ACTIVITY_MINUTES}
              stroke="#7ea18f"
              strokeDasharray="6 5"
            />

            <Tooltip content={<MorningTooltip />} />

            <Bar
              yAxisId="activity"
              dataKey="activityMinutes"
              fill="var(--primary)"
              radius={[5, 5, 0, 0]}
              maxBarSize={mode === "week" ? 40 : 14}
            />

            <Line
              yAxisId="time"
              type="monotone"
              dataKey={(day) =>
                day.firstMovementAt
                  ? parseClock(day.firstMovementAt)
                  : MORNING_END
              }
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
        <TrendSummary
          label="Low-activity mornings"
          value={`${lowActivityDays}`}
        />

        <TrendSummary
          label="Average activity"
          value={`${Math.round(averageActivityMinutes)} min`}
          withBorder
        />

        <TrendSummary
          label="Average first movement"
          value={formatClock(Math.round(averageFirstMovementMinutes))}
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

function MorningTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: MorningChartDay;
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const day = payload[0].payload;

  return (
    <div className="min-w-52 rounded-2xl border border-[#eadfce] bg-white p-3 shadow-lg">
      <p className="text-sm font-extrabold text-foreground">
        {formatFullDate(parseDate(day.date))}
      </p>

      <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
        <TooltipRow label="Activity" value={`${day.activityMinutes} min`} />

        <TooltipRow
          label="Usual activity"
          value={`${day.usualActivityMinutes} min`}
        />

        <TooltipRow
          label="First movement"
          value={day.firstMovementAt ?? "Not detected"}
        />

        <TooltipRow
          label="Difference"
          value={`${Math.abs(day.activityDifferencePercent)}% ${
            day.activityDifferencePercent < 0 ? "below usual" : "above usual"
          }`}
          warning={day.alertTriggered}
        />
      </div>
    </div>
  );
}

function TooltipRow({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <p className="flex justify-between gap-4">
      <span>{label}</span>

      <strong className={warning ? "text-[#c76535]" : "text-foreground"}>
        {value}
      </strong>
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

function createMorningActivityHistory(
  numberOfDays: number,
): MorningActivityDay[] {
  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = new Date(
      today.getTime() - (numberOfDays - index - 1) * DAY_MS,
    );

    const lowActivity = index % 9 === 0 || index % 17 === 0 || index % 31 === 0;

    const activityMinutes = lowActivity
      ? clamp(12 + ((index * 7) % 17), 12, 28)
      : clamp(42 + Math.round(Math.sin(index * 0.4) * 10), 30, 61);

    const firstMovementMinutes = lowActivity
      ? 8 * 60 + 20 + ((index * 11) % 50)
      : 6 * 60 + 50 + ((index * 13) % 35);

    const activityPeriods = createActivityPeriods(
      activityMinutes,
      firstMovementMinutes,
      index,
    );

    const usualActivityPeriods = createUsualActivityPeriods();

    const activityDifferencePercent = Math.round(
      ((activityMinutes - USUAL_ACTIVITY_MINUTES) / USUAL_ACTIVITY_MINUTES) *
        100,
    );

    return {
      date: toDateKey(date),
      firstMovementAt: activityPeriods[0]?.start ?? null,
      usualFirstMovementAt: formatClock(USUAL_FIRST_MOVEMENT),
      delayMinutes: firstMovementMinutes - USUAL_FIRST_MOVEMENT,
      activityMinutes,
      usualActivityMinutes: USUAL_ACTIVITY_MINUTES,
      activityDifferencePercent,
      alertTriggered:
        activityDifferencePercent <= -30 ||
        firstMovementMinutes - USUAL_FIRST_MOVEMENT >= 45,
      activityPeriods,
      usualActivityPeriods,
    };
  });
}

function createActivityPeriods(
  totalMinutes: number,
  firstMovementMinutes: number,
  seed: number,
): ActivityPeriod[] {
  const periodCount = totalMinutes < 25 ? 2 : 4;

  const durations = splitMinutes(totalMinutes, periodCount);

  let currentStart = firstMovementMinutes;

  return durations.map((duration, index) => {
    const gap = index === 0 ? 0 : 14 + ((seed + index * 9) % 24);

    currentStart += gap;

    const start = currentStart;

    const end = start + duration;

    currentStart = end;

    const startPosition =
      ((start - MORNING_START) / (MORNING_END - MORNING_START)) * 100;

    const width = (duration / (MORNING_END - MORNING_START)) * 100;

    return {
      id: index + 1,
      start: formatClock(start),
      end: formatClock(end),
      durationMinutes: duration,
      startPosition: clamp(Number(startPosition.toFixed(1)), 0, 98),
      width: Math.max(Number(width.toFixed(1)), 1.2),
    };
  });
}

function createUsualActivityPeriods(): ActivityPeriod[] {
  const periods = [
    {
      start: 7 * 60 + 8,
      duration: 13,
    },
    {
      start: 7 * 60 + 42,
      duration: 11,
    },
    {
      start: 8 * 60 + 20,
      duration: 12,
    },
    {
      start: 9 * 60 + 5,
      duration: 11,
    },
  ];

  return periods.map((period, index) => ({
    id: index + 1,
    start: formatClock(period.start),
    end: formatClock(period.start + period.duration),
    durationMinutes: period.duration,
    startPosition:
      ((period.start - MORNING_START) / (MORNING_END - MORNING_START)) * 100,
    width: (period.duration / (MORNING_END - MORNING_START)) * 100,
  }));
}

function splitMinutes(total: number, count: number) {
  const base = Math.floor(total / count);

  const remainder = total % count;

  return Array.from(
    { length: count },
    (_, index) => base + (index < remainder ? 1 : 0),
  );
}

function getSelectedData(
  data: MorningActivityDay[],
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

function formatMinutes(minutes: number) {
  if (minutes <= 0) {
    return "On time";
  }

  const hours = Math.floor(minutes / 60);

  const remaining = minutes % 60;

  if (hours === 0) {
    return `${remaining} min`;
  }

  return `${hours} h ${remaining} min`;
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
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);

  const hours = Math.floor(normalized / 60);

  const minutes = normalized % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
