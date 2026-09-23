import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { arrayMove } from "@dnd-kit/sortable";

import { initialTranslations } from "../data/initialTranslations";
import type {
  Language,
  TranslationItem,
} from "../types/translation";
import {
  loadTranslations,
  saveTranslations,
} from "../utils/storage";

interface TranslationContextValue {
  translations: TranslationItem[];

  updateTranslation: (
    id: string,
    language: Language,
    value: string,
  ) => void;

  addKeyword: (
    keyword: string,
    language: Language,
    translation: string,
  ) => boolean;

  reorderTranslations: (
    activeId: string,
    overId: string,
  ) => void;
}

export const TranslationContext =
  createContext<TranslationContextValue | null>(null);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({
  children,
}: TranslationProviderProps) => {
  const [translations, setTranslations] =
    useState<TranslationItem[]>(() => {
      const storedTranslations =
        loadTranslations();

      return (
        storedTranslations ??
        initialTranslations
      );
    });

  useEffect(() => {
    saveTranslations(translations);
  }, [translations]);

  const updateTranslation = (
    id: string,
    language: Language,
    value: string,
  ) => {
    setTranslations((currentTranslations) =>
      currentTranslations.map((item) =>
        item.id === id
          ? {
              ...item,
              translations: {
                ...item.translations,
                [language]: value,
              },
            }
          : item,
      ),
    );
  };

  const addKeyword = (
    keyword: string,
    language: Language,
    translation: string,
  ): boolean => {
    const trimmedKeyword =
      keyword.trim();

    const trimmedTranslation =
      translation.trim();

    if (!trimmedKeyword) {
      return false;
    }

    const alreadyExists =
      translations.some(
        (item) =>
          item.keyword.toLowerCase() ===
          trimmedKeyword.toLowerCase(),
      );

    if (alreadyExists) {
      return false;
    }

    const newTranslation: TranslationItem = {
      id: crypto.randomUUID(),
      keyword: trimmedKeyword,
      translations: {
        en: "",
        fa: "",
        de: "",
        [language]: trimmedTranslation,
      },
    };

    setTranslations(
      (currentTranslations) => [
        ...currentTranslations,
        newTranslation,
      ],
    );

    return true;
  };

  const reorderTranslations = (
    activeId: string,
    overId: string,
  ) => {
    setTranslations(
      (currentTranslations) => {
        const oldIndex =
          currentTranslations.findIndex(
            (item) =>
              item.id === activeId,
          );

        const newIndex =
          currentTranslations.findIndex(
            (item) =>
              item.id === overId,
          );

        if (
          oldIndex === -1 ||
          newIndex === -1 ||
          oldIndex === newIndex
        ) {
          return currentTranslations;
        }

        return arrayMove(
          currentTranslations,
          oldIndex,
          newIndex,
        );
      },
    );
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        updateTranslation,
        addKeyword,
        reorderTranslations,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};