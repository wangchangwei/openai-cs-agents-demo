"use client";

import { Plane, Code, MessageSquare } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:opacity-80 transition-opacity">
          <Plane className="h-6 w-6" />
          <span className="font-bold text-lg">{t("airlineCo")}</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Link 
            href="/" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${pathname === "/" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 hover:text-gray-900"}`}
          >
            <MessageSquare className="w-4 h-4" />
            {t("demo")}
          </Link>
          <Link 
            href="/code" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${pathname === "/code" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 hover:text-gray-900"}`}
          >
            <Code className="w-4 h-4" />
            {t("coreCode")}
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        <LanguageToggle />
      </div>
    </header>
  );
}
