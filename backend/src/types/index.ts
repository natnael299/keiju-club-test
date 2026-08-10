export type UserRole = "caretaker" | "nurse";

export type Owner = {
  id: string;
  fullName: string;
  birthDate: string;
  cdt: string;
  ldt: string;
};

export type User = {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  passwordHash: string;
  ownerIds: string[];
  cdt: string;
  ldt: string;
};

export type Organizer = {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  passwordHash: string;
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

export type ClubEvent = {
  id: string;
  organizerId: string;
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

export type RawNotification = {
  _id: string;
  _rev?: string;

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

  // BeneCare platform fields.
  // cId?: string;
  // subjectId?: string;
  // subjectName?: string;
  // subjectType?: string[];
  // projectId?: string;
  // projectName?: string;
  // siteId?: string;
  // siteName?: string;
};

export type WeeklyReport = {
  id: string;
  ownerId: string;

  week: number;
  startDate: string;
  endDate: string;

  createdAt: string;
  isCurrent: boolean;

  status: "stable" | "attention" | "concern";

  summary: string;

  observations: string[];

  recommendation?: string;
};
