import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import Card from "@/components/shared/Card";

export type EventFormValues = {
  title: string;
  description: string;
  city: string;
  address: string;
  startsAt: string;
  endsAt: string;

  imageFile: File | null;
  imagePreview: string | null;
};

type Props = {
  initialValues?: Partial<EventFormValues>;
  submitLabel?: string;
  submitting?: boolean;

  onSubmit: (values: EventFormValues) => void | Promise<void>;
};

const emptyValues: EventFormValues = {
  title: "",
  description: "",
  city: "",
  address: "",
  startsAt: "",
  endsAt: "",
  imageFile: null,
  imagePreview: null,
};

export default function EventForm({
  initialValues,
  submitLabel = "Save event",
  submitting = false,
  onSubmit,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [values, setValues] = useState<EventFormValues>(() => ({
    ...emptyValues,
    ...initialValues,

    // Never initialise an actual File
    // when editing an existing event.
    imageFile: null,
  }));

  const updateField = <Key extends keyof EventFormValues>(
    key: Key,
    value: EventFormValues[Key],
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (values.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(values.imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setValues((current) => ({
      ...current,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  const handleRemoveImage = () => {
    if (values.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(values.imagePreview);
    }

    setValues((current) => ({
      ...current,
      imageFile: null,
      imagePreview: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit(values);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PHOTO */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Event photo
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          {values.imagePreview ? (
            <div className="overflow-hidden rounded-3xl border border-border bg-white">
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <img
                  src={values.imagePreview}
                  alt="Event preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted/40"
                >
                  <ImagePlus className="h-4 w-4" />
                  Change photo
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-48 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/20 px-6 text-center transition hover:border-primary hover:bg-primary/5"
            >
              <div className="rounded-2xl bg-primary/10 p-4">
                <ImagePlus className="h-7 w-7 text-primary" />
              </div>

              <p className="mt-3 font-bold text-foreground">Add event photo</p>

              <p className="mt-1 text-sm text-muted-foreground">
                JPG, PNG or WEBP
              </p>
            </button>
          )}
        </div>

        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Event title
          </label>

          <input
            required
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            placeholder="Event title"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Description
          </label>

          <textarea
            required
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
            placeholder="Describe the event..."
          />
        </div>

        {/* LOCATION */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              City
            </label>

            <input
              required
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
              placeholder="Turku"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Address
            </label>

            <input
              required
              value={values.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
              placeholder="Aurakatu 12"
            />
          </div>
        </div>

        {/* TIMES */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Start time
            </label>

            <input
              required
              type="datetime-local"
              value={values.startsAt}
              onChange={(event) => updateField("startsAt", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              End time
            </label>

            <input
              required
              type="datetime-local"
              value={values.endsAt}
              onChange={(event) => updateField("endsAt", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </form>
    </Card>
  );
}
