import { useState } from "react";
import type { ReactNode } from "react";
import { CalendarDays, ChevronDown, Filter, RotateCcw } from "lucide-react";
import type { EventCategory } from "@/types";
import { defaultClubFilters, type ClubFiltersValue } from "./clubFilters.types";
type Props = {
  value: ClubFiltersValue;
  onChange: (filters: ClubFiltersValue) => void;
  resultCount?: number;
};

const categoryOptions: {
  label: string;
  value: EventCategory;
}[] = [
  {
    label: "Health",
    value: "health",
  },
  {
    label: "Exercise",
    value: "exercise",
  },
  {
    label: "Culture",
    value: "culture",
  },
  {
    label: "Learning",
    value: "learning",
  },
  {
    label: "Social",
    value: "social",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
  {
    label: "Other",
    value: "other",
  },
];

export default function ClubFilters({ value, onChange, resultCount }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<ClubFiltersValue>(value);
  const updateDraft = <Key extends keyof ClubFiltersValue>(
    key: Key,
    nextValue: ClubFiltersValue[Key],
  ) => {
    setDraftFilters((current) => ({
      ...current,
      [key]: nextValue,
    }));
  };

  const toggleCategory = (category: EventCategory) => {
    const categories = draftFilters.categories;

    if (categories.includes(category)) {
      updateDraft(
        "categories",
        categories.filter((item) => item !== category),
      );

      return;
    }

    updateDraft("categories", [...categories, category]);
  };

  const handleApply = () => {
    onChange(draftFilters);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDraftFilters(value);
    setIsOpen(false);
  };

  const handleClear = () => {
    setDraftFilters(defaultClubFilters);

    onChange(defaultClubFilters);
  };

  const activeFilterCount =
    value.categories.length + Number(value.date !== "all");

  return (
    <section className="mb-6 overflow-hidden rounded-[24px] border border-border bg-card">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
        >
          <Filter className="h-4 w-4" />

          <span>Filters</span>

          {activeFilterCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/20 px-1 text-xs">
              {activeFilterCount}
            </span>
          )}

          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={activeFilterCount === 0}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          Clear all
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border px-4 py-5 sm:px-5">
          <div className="grid gap-6 md:grid-cols-2">
            <FilterGroup title="Categories">
              <div className="grid gap-2 sm:grid-cols-2">
                {categoryOptions.map((category) => (
                  <CheckboxOption
                    key={category.value}
                    label={category.label}
                    checked={draftFilters.categories.includes(category.value)}
                    onChange={() => toggleCategory(category.value)}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Date">
              <div className="space-y-2">
                <RadioOption
                  name="club-date-filter"
                  label="All dates"
                  checked={draftFilters.date === "all"}
                  onChange={() => updateDraft("date", "all")}
                />

                <RadioOption
                  name="club-date-filter"
                  label="Today"
                  checked={draftFilters.date === "today"}
                  onChange={() => updateDraft("date", "today")}
                />

                <RadioOption
                  name="club-date-filter"
                  label="This week"
                  checked={draftFilters.date === "thisWeek"}
                  onChange={() => updateDraft("date", "thisWeek")}
                />

                <RadioOption
                  name="club-date-filter"
                  label="This month"
                  checked={draftFilters.date === "thisMonth"}
                  onChange={() => updateDraft("date", "thisMonth")}
                />

                <RadioOption
                  name="club-date-filter"
                  label="Custom range"
                  checked={draftFilters.date === "custom"}
                  onChange={() => updateDraft("date", "custom")}
                />
              </div>

              {draftFilters.date === "custom" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <DateInput
                    label="Start date"
                    value={draftFilters.customStartDate}
                    onChange={(date) => updateDraft("customStartDate", date)}
                  />

                  <DateInput
                    label="End date"
                    value={draftFilters.customEndDate}
                    onChange={(date) => updateDraft("customEndDate", date)}
                  />
                </div>
              )}
            </FilterGroup>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {typeof resultCount === "number" && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {resultCount}
                  </span>{" "}
                  events found
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="h-11 flex-1 rounded-xl border border-border bg-white px-5 text-sm font-semibold text-foreground transition active:scale-[0.98] sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="h-11 flex-1 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition active:scale-[0.98] sm:flex-none"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/40 p-4">
      <h3 className="mb-3 text-sm font-extrabold text-foreground">{title}</h3>

      {children}
    </div>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
      />

      <span className="text-sm leading-5 text-foreground">{label}</span>
    </label>
  );
}

function RadioOption({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-primary"
      />

      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (date: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <div className="mt-1 flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-3">
        <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />

        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-foreground outline-none"
        />
      </div>
    </label>
  );
}
