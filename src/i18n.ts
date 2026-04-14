import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Week 1 Catalog Page",

        catalog: {
          title: "Catalog List",
          pageTitle: "Product Catalog",
          search: "Search products...",
          create: "Create Item",
          createTitle: "Create Product",
          editTitle: "Edit Item",
          checking: "Checking uniqueness...",

          name: "Name",
          price: "Price",

          all: "All",
          audio: "Audio",
          peripherals: "Peripherals",
          accessories: "Accessories",

          priceAsc: "Price ↑",
          priceDesc: "Price ↓",

          edit: "Edit",
          delete: "Delete",

          deleteTitle: "Delete Item?",
          deleteMessage:
            "Are you sure you want to delete {{name}}? This action cannot be undone.",

          saving: "Saving...",
          empty: "No products found",
          error: "Failed to load products",
        },

        common: {
          retry: "Retry",
          cancel: "Cancel",
          submit: "Submit",
          update: "Update",
          create: "Create",
          creating: "Creating...",
          updating: "Updating...",
        },

        errors: {
          nameRequired: "Name is required",
          priceRequired: "Price is required",
          priceMin: "Price must be greater than 0",
          duplicateName: "Name already exists",
        },
      },
    },

    es: {
      translation: {
        title: "Página de Catálogo Semana 1",

        catalog: {
          title: "Lista de Catálogo",
          pageTitle: "Catálogo de Productos",
          search: "Buscar productos...",
          create: "Crear",
          createTitle: "Crear Producto",
          editTitle: "Editar Producto",
          checking: "Verificando disponibilidad...",

          name: "Nombre",
          price: "Precio",

          all: "Todos",
          audio: "Audio",
          peripherals: "Periféricos",
          accessories: "Accesorios",

          priceAsc: "Precio ↑",
          priceDesc: "Precio ↓",

          edit: "Editar",
          delete: "Eliminar",

          deleteTitle: "¿Eliminar elemento?",
          deleteMessage:
            "¿Seguro que deseas eliminar {{name}}? Esta acción no se puede deshacer.",

          saving: "Guardando...",
          empty: "No hay productos",
          error: "Error al cargar productos",
        },

        common: {
          retry: "Reintentar",
          cancel: "Cancelar",
          submit: "Enviar",
          update: "Actualizar",
          create: "Crear",
          creating: "Creando...",
          updating: "Actualizando...",
        },

        errors: {
          nameRequired: "El nombre es obligatorio",
          priceRequired: "El precio es obligatorio",
          priceMin: "El precio debe ser mayor que 0",
          duplicateName: "El nombre ya existe",
        },
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