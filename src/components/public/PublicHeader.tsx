import type { Language } from "../../types/translation";
import { LanguageSelect } from "../common/LanguageSelect";

interface PublicHeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const PublicHeader = ({
  selectedLanguage,
  onLanguageChange,
}: PublicHeaderProps) => {
  return (
    <header
      className="
        flex
        justify-between
        border-b
        border-gray-100
        pb-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">
      <h1
        className="
            text-lg
            font-semibold
            tracking-tight
            text-gray-900
          ">
        Word Translations
      </h1>

      <LanguageSelect
        value={selectedLanguage}
        onChange={onLanguageChange}
        variant="public"
      />
    </header>
  );
};
