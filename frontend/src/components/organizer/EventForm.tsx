import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";

import { ExternalLink, ImagePlus, Trash2 } from "lucide-react";

import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";

import type { EventAudience, EventCategory } from "@/types";

export type EventFormValues = {
  title: string;
  description: string;

  city: string;
  address: string;

  startsAt: string;
  endsAt: string;

  registrationUrl: string;

  categories: EventCategory[];
  audience: EventAudience;

  imageFile: File | null;
  imagePreview: string | null;
};

type Props = {
  initialValues?: Partial<EventFormValues>;
  submitLabel?: string;
  submitting?: boolean;

  onSubmit: (values: EventFormValues) => void | Promise<void>;
};

const categoryOptions: EventCategory[] = [
  "health",
  "exercise",
  "culture",
  "learning",
  "social",
  "gaming",
  "other",
];

const audienceOptions: EventAudience[] = ["owner", "caretaker", "both"];

const emptyValues: EventFormValues = {
  title: "",
  description: "",

  city: "",
  address: "",

  startsAt: "",
  endsAt: "",

  registrationUrl: "",

  categories: [],
  audience: "both",

  imageFile: null,
  imagePreview: null,
};

export default function EventForm({
  initialValues,
  submitLabel,
  submitting = false,
  onSubmit,
}: Props) {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [values, setValues] = useState<EventFormValues>(() => ({
    ...emptyValues,
    ...initialValues,

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

  const toggleCategory = (category: EventCategory) => {
    setValues((current) => ({
      ...current,

      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
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

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      ...values,
      registrationUrl: values.registrationUrl.trim(),
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PHOTO */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            {t("eventForm.photo")}
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
                  alt={t("eventForm.photo")}
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

                  {t("eventForm.changePhoto")}
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />

                  {t("eventForm.remove")}
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

              <p className="mt-3 font-bold text-foreground">
                {t("eventForm.addPhoto")}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {t("eventForm.photoFormats")}
              </p>
            </button>
          )}
        </div>

        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            {t("eventForm.title")}
          </label>

          <input
            required
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
            placeholder={t("eventForm.titlePlaceholder")}
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            {t("eventForm.description")}
          </label>

          <textarea
            required
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
            placeholder={t("eventForm.descriptionPlaceholder")}
          />
        </div>

        {/* CATEGORIES */}

        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("eventForm.categories")}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("eventForm.categoriesDescription")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => {
              const selected = values.categories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-primary/5",
                  ].join(" ")}
                >
                  {t(`eventCategory.${category}`)}
                </button>
              );
            })}
          </div>

          {values.categories.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {t("eventForm.categoryRequired")}
            </p>
          )}
        </div>

        {/* AUDIENCE */}

        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("eventForm.audience")}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("eventForm.audienceDescription")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {audienceOptions.map((audience) => {
              const selected = values.audience === audience;

              return (
                <button
                  key={audience}
                  type="button"
                  onClick={() => updateField("audience", audience)}
                  className={[
                    "rounded-2xl border p-4 text-left transition",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-white hover:border-primary/50",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "h-4 w-4 rounded-full border",
                        selected
                          ? "border-[5px] border-primary"
                          : "border-border",
                      ].join(" ")}
                    />

                    <span className="font-semibold text-foreground">
                      {t(`eventForm.${audience}`)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {t(`eventForm.${audience}Description`)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOCATION */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              {t("eventForm.city")}
            </label>

            <input
              required
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
              placeholder={t("eventForm.cityPlaceholder")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              {t("eventForm.address")}
            </label>

            <input
              required
              value={values.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-primary"
              placeholder={t("eventForm.addressPlaceholder")}
            />
          </div>
        </div>

        {/* TIMES */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              {t("eventForm.startTime")}
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
              {t("eventForm.endTime")}
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

        {/* REGISTRATION LINK */}

        <div>
          <label
            htmlFor="registrationUrl"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {t("eventForm.registrationUrl", {
              defaultValue: "Registration link",
            })}
          </label>

          <div className="relative">
            <ExternalLink className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              id="registrationUrl"
              type="url"
              value={values.registrationUrl}
              onChange={(event) =>
                updateField("registrationUrl", event.target.value)
              }
              className="h-12 w-full rounded-2xl border border-border bg-white pl-11 pr-4 text-sm outline-none focus:border-primary"
              placeholder={t("eventForm.registrationUrlPlaceholder", {
                defaultValue: "https://example.com/register",
              })}
            />
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            {t("eventForm.registrationUrlDescription", {
              defaultValue:
                "Optional. People will be directed to this website to register.",
            })}
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || values.categories.length === 0}
          className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? t("eventForm.saving")
            : (submitLabel ?? t("eventForm.save"))}
        </button>
      </form>
    </Card>
  );
}
