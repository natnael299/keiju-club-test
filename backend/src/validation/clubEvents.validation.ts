import type {
  EventAudience,
  EventCategory,
  RegistrationStatus,
} from "../types/index.js";

export type ValidatedClubEventInput = {
  title: string;
  description: string;

  imageUrl?: string;

  registrationUrl?: string;
  registrationStatus?: RegistrationStatus;

  categories: EventCategory[];
  audience: EventAudience;

  address: string;
  city: string;

  startsAt: string;
  endsAt: string;
};

type ValidationSuccess = {
  success: true;
  data: ValidatedClubEventInput;
};

type ValidationFailure = {
  success: false;
  error: string;
};

export type ClubEventValidationResult = ValidationSuccess | ValidationFailure;

const eventCategories: EventCategory[] = [
  "health",
  "exercise",
  "culture",
  "learning",
  "social",
  "gaming",
  "other",
];

const eventAudiences: EventAudience[] = ["owner", "caretaker", "both"];

const registrationStatuses: RegistrationStatus[] = ["open", "full", "closed"];

export function validateClubEventInput(
  value: unknown,
): ClubEventValidationResult {
  if (!isRecord(value)) {
    return failure("Event information must be an object.");
  }

  const title = getRequiredString(value.title, "Title", 120);

  if (!title.success) {
    return title;
  }

  const description = getRequiredString(
    value.description,
    "Description",
    2_000,
  );

  if (!description.success) {
    return description;
  }

  const city = getRequiredString(value.city, "City", 100);

  if (!city.success) {
    return city;
  }

  const address = getRequiredString(value.address, "Address", 250);

  if (!address.success) {
    return address;
  }

  const startsAt = getValidDate(value.startsAt, "Start date");

  if (!startsAt.success) {
    return startsAt;
  }

  const endsAt = getValidDate(value.endsAt, "End date");

  if (!endsAt.success) {
    return endsAt;
  }

  if (new Date(startsAt.data).getTime() >= new Date(endsAt.data).getTime()) {
    return failure("The event end date must be after its start date.");
  }

  const categories = getCategories(value.categories);

  if (!categories.success) {
    return categories;
  }

  if (
    typeof value.audience !== "string" ||
    !eventAudiences.includes(value.audience as EventAudience)
  ) {
    return failure("Select a valid event audience.");
  }

  const imageUrl = getOptionalUrl(value.imageUrl, "Image URL");

  if (!imageUrl.success) {
    return imageUrl;
  }

  const registrationUrl = getOptionalUrl(
    value.registrationUrl,
    "Registration URL",
  );

  if (!registrationUrl.success) {
    return registrationUrl;
  }

  const registrationStatus = getRegistrationStatus(
    value.registrationStatus,
    registrationUrl.data,
  );

  if (!registrationStatus.success) {
    return registrationStatus;
  }

  return {
    success: true,
    data: {
      title: title.data,
      description: description.data,

      imageUrl: imageUrl.data,

      registrationUrl: registrationUrl.data,
      registrationStatus: registrationStatus.data,

      categories: categories.data,
      audience: value.audience as EventAudience,

      address: address.data,
      city: city.data,

      startsAt: startsAt.data,
      endsAt: endsAt.data,
    },
  };
}

function getRequiredString(
  value: unknown,
  fieldName: string,
  maximumLength: number,
): ValidationFailure | { success: true; data: string } {
  if (typeof value !== "string" || !value.trim()) {
    return failure(`${fieldName} is required.`);
  }

  const normalizedValue = value.trim();

  if (normalizedValue.length > maximumLength) {
    return failure(`${fieldName} must not exceed ${maximumLength} characters.`);
  }

  return {
    success: true,
    data: normalizedValue,
  };
}

function getValidDate(
  value: unknown,
  fieldName: string,
): ValidationFailure | { success: true; data: string } {
  if (typeof value !== "string" || !value.trim()) {
    return failure(`${fieldName} is required.`);
  }

  const timestamp = new Date(value).getTime();

  if (Number.isNaN(timestamp)) {
    return failure(`${fieldName} must be a valid date and time.`);
  }

  return {
    success: true,
    data: value,
  };
}

function getCategories(
  value: unknown,
): ValidationFailure | { success: true; data: EventCategory[] } {
  if (!Array.isArray(value) || value.length === 0) {
    return failure("Select at least one event category.");
  }

  const categories = [...new Set(value)];

  if (
    categories.some(
      (category) =>
        typeof category !== "string" ||
        !eventCategories.includes(category as EventCategory),
    )
  ) {
    return failure("One or more event categories are invalid.");
  }

  return {
    success: true,
    data: categories as EventCategory[],
  };
}

function getOptionalUrl(
  value: unknown,
  fieldName: string,
): ValidationFailure | { success: true; data?: string } {
  if (value === undefined || value === null || value === "") {
    return {
      success: true,
      data: undefined,
    };
  }

  if (typeof value !== "string") {
    return failure(`${fieldName} must be a string.`);
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return {
      success: true,
      data: undefined,
    };
  }

  if (normalizedValue.length > 2_048) {
    return failure(`${fieldName} is too long.`);
  }

  try {
    const url = new URL(normalizedValue);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return failure(`${fieldName} must use HTTP or HTTPS.`);
    }

    return {
      success: true,
      data: url.toString(),
    };
  } catch {
    return failure(`${fieldName} must be a valid web address.`);
  }
}

function getRegistrationStatus(
  value: unknown,
  registrationUrl?: string,
):
  | ValidationFailure
  | {
      success: true;
      data?: RegistrationStatus;
    } {
  if (!registrationUrl) {
    if (value !== undefined && value !== null && value !== "") {
      return failure(
        "Registration status cannot be set without a registration URL.",
      );
    }

    return {
      success: true,
      data: undefined,
    };
  }

  if (value === undefined || value === null || value === "") {
    return {
      success: true,
      data: "open",
    };
  }

  if (
    typeof value !== "string" ||
    !registrationStatuses.includes(value as RegistrationStatus)
  ) {
    return failure("Select a valid registration status.");
  }

  return {
    success: true,
    data: value as RegistrationStatus,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function failure(error: string): ValidationFailure {
  return {
    success: false,
    error,
  };
}
