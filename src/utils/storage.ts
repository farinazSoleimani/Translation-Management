import type {
  Language,
  TranslationItem,
} from "../types/translation";

const STORAGE_KEY =
  "translation-management-data";

const LANGUAGE_STORAGE_KEY =
  "translation-management-language";

const SUPPORTED_LANGUAGES: Language[] = [
  "en",
  "fa",
  "de",
];

const isLanguage = (
  value: unknown,
): value is Language => {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(
      value as Language,
    )
  );
};

const isTranslationItem = (
  value: unknown,
): value is TranslationItem => {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const item =
    value as Record<string, unknown>;

  if (
    typeof item.id !== "string" ||
    typeof item.keyword !== "string"
  ) {
    return false;
  }

  if (
    typeof item.translations !== "object" ||
    item.translations === null
  ) {
    return false;
  }

  const translations =
    item.translations as Record<
      string,
      unknown
    >;

  return SUPPORTED_LANGUAGES.every(
    (language) =>
      typeof translations[language] ===
      "string",
  );
};

const isTranslationList = (
  value: unknown,
): value is TranslationItem[] => {
  return (
    Array.isArray(value) &&
    value.every(isTranslationItem)
  );
};

export const loadTranslations =
  (): TranslationItem[] | null => {
    try {
      const storedData =
        localStorage.getItem(STORAGE_KEY);

      if (!storedData) {
        return null;
      }

      const parsedData: unknown =
        JSON.parse(storedData);

      if (!isTranslationList(parsedData)) {
        return null;
      }

      return parsedData;
    } catch {
      return null;
    }
  };

export const saveTranslations = (
  translations: TranslationItem[],
): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(translations),
    );
  } catch {
    // Ignore storage errors.
  }
};

export const loadSelectedLanguage =
  (): Language => {
    try {
      const storedLanguage =
        localStorage.getItem(
          LANGUAGE_STORAGE_KEY,
        );

      return isLanguage(storedLanguage)
        ? storedLanguage
        : "fa";
    } catch {
      return "fa";
    }
  };

export const saveSelectedLanguage = (
  language: Language,
): void => {
  try {
    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language,
    );
  } catch {
    // Ignore storage errors.
  }
};

export const clearTranslationsStorage =
  (): void => {
    try {
      localStorage.removeItem(
        STORAGE_KEY,
      );
  } catch {
      // Ignore storage errors.
    }
  };