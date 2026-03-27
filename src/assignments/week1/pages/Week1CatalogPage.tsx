import Button from "../../../shared/ui/Button";
import { useTranslation } from "react-i18next";
import ResponsivePageShell from "../../../shared/ui/ResponsivePageShell";


export default function Week1CatalogPage() {
  const { t, i18n } = useTranslation();

  return (
    <ResponsivePageShell>
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Week 1 Catalog Page</h1>

      <Button label={t("button")} onClick={() => alert("Button clicked")} />

      <button
        onClick={() => i18n.changeLanguage("hi")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        Switch to Hindi
      </button>
    </div>
    </ResponsivePageShell>
  );
}
