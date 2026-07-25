import type { EventCategory } from "@/types";

export type ClubFilter = EventCategory | "all";

const filters: { label: string; value: ClubFilter }[] = [
  { label: "All", value: "all" },
  { label: "Health", value: "health" },
  { label: "Exercise", value: "exercise" },
  { label: "Culture", value: "culture" },
  { label: "Learning", value: "learning" },
  { label: "Social", value: "social" },
];

type Props = {
  activeFilter: ClubFilter;
  onChange: (filter: ClubFilter) => void;
};

export default function ClubFilters({ activeFilter, onChange }: Props) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={[
            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
            activeFilter === filter.value
              ? "bg-primary text-primary-foreground"
              : "bg-white text-muted-foreground",
          ].join(" ")}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
