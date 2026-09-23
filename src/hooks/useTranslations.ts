import { useContext } from 'react';

import {
  TranslationContext,
} from '../context/TranslationContext';

export const useTranslations = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error(
      'useTranslations must be used within TranslationProvider',
    );
  }

  return context;
};