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
        catalog: {
          title: "Catalog List",
          pageTitle: "Product Catalog",
          search: "Search products...",
          filter: "Filter",
          sort: "Sort",
          create: "Create Item",
          empty: "No products found",
          loading: "Loading State",
          success: "Success State",
          error: "Failed to load products"
        },

        // ✅ COMMON
        common: {
          retry: "Retry",
          loading: "loading",
          success: "success"
        }
      },
    },

    es: {
      translation: {
        title: "Página de Catálogo Semana 1",
        clickMe: "Haz clic",
        switchLanguage: "Cambiar a Inglés",
        catalog: {
          title: "Lista de Catálogo",
          pageTitle: "Catálogo de Productos",
          search: "Buscar productos...",
          filter: "Filtrar",
          sort: "Ordenar",
          create: "Crear",
          empty: "No hay productos",
          loading: "Cargando",
          success: "Éxito",
          error: "Error al cargar productos"
        },

        common: {
          retry: "Reintentar",
          loading: "cargando",
          success: "éxito"
        }
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