import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Week 1 Catalog Page",
        clickMe: "Click Me",
        switchLanguage: "Switch to Spanish",
      },
    },
    es: {
      translation: {
        title: "Página de Catálogo Semana 1",
        clickMe: "Haz clic",
        switchLanguage: "Cambiar a Inglés",
      },
    },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;