import { ChevronDown } from "lucide-react";

import type { Language } from "../../types/translation";

interface LanguageSelectProps {
  value: Language;
  onChange: (language: Language) => void;
  variant?: "management" | "public";
}

const languageOptions: Array<{
  value: Language;
  label: string;
}> = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fa",
    label: "فارسی",
  },
  {
    value: "de",
    label: "Deutsch",
  },
];

export const LanguageSelect = ({
  value,
  onChange,
  variant = "management",
}: LanguageSelectProps) => {
  const isManagement = variant === "management";

  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as Language)}
        className={`
          appearance-none
          bg-transparent
          text-xs
          h-7
          outline-none
          cursor-pointer
border
          border-gray-200
rounded-md
          ${
            isManagement
              ? `
                min-w-28
                pl-4
                pr-2
                text-right
                font-medium
                text-blue-700
              `
              : `
                min-w-16
                pl-0
                pr-4
                text-right
                font-medium
                text-blue-700
              `
          }
        `}
        aria-label="Select language">
        {languageOptions.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        strokeWidth={2}
        className={`
          pointer-events-none
          absolute
          top-1/2
          -translate-y-1/2
          transition-transform
          duration-200
          ${
            isManagement
              ? `
                left-0
                text-gray-500
              `
              : `
                right-0
                text-blue-600
              `
          }
        `}
        aria-hidden="true"
      />
    </div>
  );
};
