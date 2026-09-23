import {
  useEffect,
  useState,
} from "react";

import type { Language } from "../types/translation";

import { AddKeywordButton } from "../components/dashboard/AddKeywordButton";
import { AddKeywordModal } from "../components/dashboard/AddKeywordModal";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { TranslationList } from "../components/dashboard/TranslationList";
import { AppLayout } from "../components/layout/AppLayout";
import { useTranslations } from "../hooks/useTranslations";
import {
  loadSelectedLanguage,
  saveSelectedLanguage,
} from "../utils/storage";

export const DashboardPage = () => {
  const {
    translations,
    updateTranslation,
    addKeyword,
    reorderTranslations,
  } = useTranslations();

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(
      loadSelectedLanguage,
    );

  const [
    isAddKeywordModalOpen,
    setIsAddKeywordModalOpen,
  ] = useState(false);

  useEffect(() => {
    saveSelectedLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <AppLayout>
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          sm:p-7
        "
      >
        <DashboardHeader
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        <div className="mt-6">
          <TranslationList
            translations={translations}
            language={selectedLanguage}
            onChange={updateTranslation}
            onReorder={reorderTranslations}
          />
        </div>

        <div className="mt-5">
          <AddKeywordButton
            onClick={() =>
              setIsAddKeywordModalOpen(true)
            }
          />
        </div>
      </div>

      <AddKeywordModal
        open={isAddKeywordModalOpen}
        onClose={() =>
          setIsAddKeywordModalOpen(false)
        }
        onSubmit={addKeyword}
      />
    </AppLayout>
  );
};