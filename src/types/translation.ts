export type Language = 'en' | 'fa' | 'de';

export interface TranslationItem {
  id: string;
  keyword: string;
  translations: Record<Language, string>;
}