export type UserRole = "caretaker" | "organizationRep";

export type DocumentType =
  | "user"
  | "owner"
  | "organization"
  | "clubEvent"
  | "notification"
  | "weeklyReport";

export type User = {
  _id: string;
  _rev?: string;
  docType: "user";

  role: UserRole;
  fullName: string;
  email: string;
  passwordHash: string;

  ownerIds?: string[];
  organizationId?: string;

  cdt: string;
  ldt: string;
};

export type Owner = {
  _id: string;
  _rev?: string;
  docType: "owner";

  fullName: string;
  birthDate: string;

  cdt: string;
  ldt: string;
};

export type Organization = {
  _id: string;
  _rev?: string;
  docType: "organization";

  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;

  cdt: string;
  ldt: string;
};

export type ClubEvent = {
  _id: string;
  _rev?: string;
  docType: "clubEvent";

  organizationId: string;

  title: string;
  description: string;
  imageUrl?: string;

  categories: EventCategory[];
  audience: EventAudience;

  address: string;
  city: string;

  startsAt: string;
  endsAt: string;

  cdt: string;
  ldt: string;
};

export type RawNotification = {
  _id: string;
  _rev?: string;

  docType: "notification";
  type: "notif";

  ownerId: string;
  ownerName: string;

  dt: string;
  cdt: string;
  ldt?: string;
  ts: number;

  level: NotificationLevel;
  term: string;
  category?: NotificationCategory;

  content: Record<string, unknown>;
  position?: NotificationPosition;

  reviewed: boolean;
};

export type WeeklyReport = {
  _id: string;
  _rev?: string;
  docType: "weeklyReport";

  ownerId: string;

  week: number;
  startDate: string;
  endDate: string;

  isCurrent: boolean;

  status: "stable" | "attention" | "concern";

  summary: string;
  observations: string[];
  recommendation?: string;

  cdt: string;
  ldt: string;
};

export type EventCategory =
  | "health"
  | "exercise"
  | "culture"
  | "learning"
  | "social"
  | "gaming"
  | "other";

export type EventAudience = "owner" | "caretaker" | "both";

export type NotificationLevel =
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "80"
  | "90"
  | "99";

export type NotificationCategory =
  | "health"
  | "sleep"
  | "activity"
  | "nutrition"
  | "hygiene"
  | "device"
  | "emergency"
  | "info";

export type NotificationPosition = {
  city?: string;
  address?: string;
  area?: string;
  floor?: string;
};
