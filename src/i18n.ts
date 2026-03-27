import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Week 1 Catalog Page",
        button: "Click Me",
      },
    },
    hi: {
      translation: {
        title: "सप्ताह 1 कैटलॉग पेज",
        button: "क्लिक करें",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
