import type { EventCategory } from "@/types";

export type ClubDateFilter =
  | "all"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "custom";

export type ClubFiltersValue = {
  categories: EventCategory[];

  date: ClubDateFilter;

  customStartDate: string;
  customEndDate: string;
};

export const defaultClubFilters: ClubFiltersValue = {
  categories: [],
  date: "all",
  customStartDate: "",
  customEndDate: "",
};
