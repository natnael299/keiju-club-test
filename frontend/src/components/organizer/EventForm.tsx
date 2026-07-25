import Card from "@/components/shared/Card";

export default function EventForm() {
  return (
    <Card className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Event title
        </label>
        <input
          className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
          placeholder="Gentle chair yoga"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Description
        </label>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          placeholder="Describe the event..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            City
          </label>
          <input
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            placeholder="Turku"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Address
          </label>
          <input
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            placeholder="Aurakatu 12"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Start time
          </label>
          <input
            type="datetime-local"
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            End time
          </label>
          <input
            type="datetime-local"
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <button
        type="button"
        className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground"
      >
        Save event
      </button>
    </Card>
  );
}
