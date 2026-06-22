"use client";

import { useTranslation } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  return (
    <button
      className="flex items-center gap-2 font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors"
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
    >
      <Languages className="w-4 h-4 text-gray-500" />
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}
