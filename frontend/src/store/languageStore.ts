import { create } from "zustand";
import i18n from "@/il8n";

export type Language = "fi" | "sv" | "en";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const isLanguage = (value: string | null): value is Language => {
  return value === "fi" || value === "sv" || value === "en";
};

const savedLanguage = localStorage.getItem("keiju-language");

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: isLanguage(savedLanguage) ? savedLanguage : "fi",

  setLanguage: (language) => {
    localStorage.setItem("keiju-language", language);
    i18n.changeLanguage(language);
    set({ language });
  },
}));
