import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

type Filter = "all" | "urgent" | "info";

type AlertsFiltersProps = {
  activeFilter: Filter;
  onChange: (filter: Filter) => void;
};

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Urgent", value: "urgent" },
  { label: "Information", value: "info" },
];

export type { Filter };

export default function AlertsFilters({
  activeFilter,
  onChange,
}: AlertsFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <SlidersHorizontal size={18} />
          Filters
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <button type="button" className="text-sm font-semibold text-primary">
          Clear all
        </button>
      </div>

      {expanded && (
        <div className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-lg">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-bold text-foreground">
                Severity
              </h3>

              <div className="space-y-2">
                {filters.map((filter) => (
                  <label
                    key={filter.value}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      checked={activeFilter === filter.value}
                      onChange={() => onChange(filter.value)}
                      className="h-4 w-4 accent-primary"
                    />

                    <span className="text-sm text-foreground">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold text-foreground">
                Notification type
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-3">
                  <input type="checkbox" disabled />
                  Out of bed
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" disabled />
                  Low morning activity
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" disabled />
                  No kitchen activity
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" disabled />
                  Distress
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold text-foreground">Date</h3>

              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-3">
                  <input type="radio" disabled />
                  Today
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" defaultChecked disabled />
                  Last 7 days
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" disabled />
                  Last 30 days
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" disabled />
                  Custom range
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">24</span> alerts
              found
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
