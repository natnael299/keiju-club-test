import type { EventCategory } from "@/types";

export type ClubDateFilter =
  | "all"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "custom";

export type ClubPriceFilter = "all" | "free" | "paid";

export type ClubDistanceFilter = "all" | "2" | "5" | "10" | "custom";

export type ClubLanguage = "fi" | "sv" | "en";

export type ClubOtherFilter =
  | "indoor"
  | "outdoor"
  | "wheelchair"
  | "familyFriendly"
  | "seniorFriendly"
  | "available";

export type ClubFiltersValue = {
  categories: EventCategory[];
  date: ClubDateFilter;
  customStartDate: string;
  customEndDate: string;
  price: ClubPriceFilter;
  distance: ClubDistanceFilter;
  customDistance: string;
  organizers: string[];
  languages: ClubLanguage[];
  other: ClubOtherFilter[];
};

export const defaultClubFilters: ClubFiltersValue = {
  categories: [],
  date: "all",
  customStartDate: "",
  customEndDate: "",
  price: "all",
  distance: "all",
  customDistance: "",
  organizers: [],
  languages: [],
  other: [],
};
