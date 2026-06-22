"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from "@/lib/i18n";

interface CollapsibleCodeBlockProps {
  title: string;
  icon: React.ReactNode;
  headerColorClass: string;
  code: string;
  defaultOpen?: boolean;
}

export function CollapsibleCodeBlock({
  title,
  icon,
  headerColorClass,
  code,
  defaultOpen = true,
}: CollapsibleCodeBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${headerColorClass} w-full px-4 py-3 flex items-center justify-between text-white hover:brightness-105 transition-all`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
          {isOpen ? t("collapseBtn") : t("expandBtn")}
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <div className="p-0">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1.5rem', borderRadius: 0, fontSize: '0.875rem' }}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
