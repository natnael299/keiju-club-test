import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fi from "./locales/fi.json";
import sv from "./locales/sv.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("keiju-language") ?? "fi";

i18n.use(initReactI18next).init({
  resources: {
    fi: { translation: fi },
    sv: { translation: sv },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
