import type { Language } from '../../types/translation';
import { LanguageSelect } from '../common/LanguageSelect';

interface DashboardHeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const DashboardHeader = ({
  selectedLanguage,
  onLanguageChange,
}: DashboardHeaderProps) => {
  return (
    <header
      className="
        flex
        justify-between
        align-middle
        border-b
        border-gray-100
        pb-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
        <h1 className="md:text-xl text-md font-semibold tracking-tight text-gray-900">
          Translation Management
        </h1>

        <LanguageSelect
        value={selectedLanguage}
        onChange={onLanguageChange}
        variant="management"
      />
    </header>
  );
};