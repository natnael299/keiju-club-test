type Filter = "all" | "urgent" | "info";

type AlertsFiltersProps = {
  activeFilter: Filter;
  onChange: (filter: Filter) => void;
};

const filters: { label: string; value: Filter }[] = [
  { label: "Kaikki", value: "all" },
  { label: "Kiireelliset", value: "urgent" },
  { label: "Tiedoksi", value: "info" },
];

export type { Filter };

export default function AlertsFilters({
  activeFilter,
  onChange,
}: AlertsFiltersProps) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
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
