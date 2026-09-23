import {
  useEffect,
  useState,
} from "react";

import { AppLayout } from "../components/layout/AppLayout";
import { PublicHeader } from "../components/public/PublicHeader";
import { TranslationCardList } from "../components/public/TranslationCardList";
import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "../types/translation";
import {
  loadSelectedLanguage,
  saveSelectedLanguage,
} from "../utils/storage";

export const PublicViewPage = () => {
  const { translations } = useTranslations();

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(
      loadSelectedLanguage,
    );

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
        <PublicHeader
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        <div className="mt-6">
          <TranslationCardList
            translations={translations}
            language={selectedLanguage}
          />
        </div>
      </div>
    </AppLayout>
  );
};