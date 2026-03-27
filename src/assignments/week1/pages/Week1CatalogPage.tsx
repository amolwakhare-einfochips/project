import { useTranslation } from "react-i18next";
import ResponsivePageShell from "../../../shared/ui/ResponsivePageShell";
import { useEffect } from "react";

const Week1CatalogPage = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        const text = await res.text();
        console.log("RAW RESPONSE:", text); 
        return JSON.parse(text);
      })
      .then((data) => console.log("DATA:", data))
      .catch((err) => console.error("ERROR:", err));
  }, []);

  return (
    <ResponsivePageShell title={t("title")}>
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
        onClick={() => alert("Clicked")}
      >
        {t("clickMe")}
      </button>

      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={handleLanguageToggle}
      >
        {t("switchLanguage")}
      </button>
    </ResponsivePageShell>
  );
};

export default Week1CatalogPage;