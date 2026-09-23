import type { TranslationItem } from '../types/translation';

export const initialTranslations: TranslationItem[] = [
  {
    id: '1',
    keyword: 'Hello',
    translations: {
      en: 'Hello',
      fa: 'سلام',
      de: 'Hallo',
    },
  },
  {
    id: '2',
    keyword: 'Welcome',
    translations: {
      en: 'Welcome',
      fa: 'خوش آمدید',
      de: 'Willkommen',
    },
  },
  {
    id: '3',
    keyword: 'Settings',
    translations: {
      en: 'Settings',
      fa: 'تنظیمات',
      de: 'Einstellungen',
    },
  },
  {
    id: '4',
    keyword: 'Profile',
    translations: {
      en: 'Profile',
      fa: 'پروفایل',
      de: 'Profil',
    },
  },
  {
    id: '5',
    keyword: 'Logout',
    translations: {
      en: 'Logout',
      fa: 'خروج',
      de: 'Abmelden',
    },
  },
];