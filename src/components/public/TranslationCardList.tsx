import type {
  Language,
  TranslationItem,
} from '../../types/translation';

import { TranslationCard } from './TranslationCard';

interface TranslationCardListProps {
  translations: TranslationItem[];
  language: Language;
}

export const TranslationCardList = ({
  translations,
  language,
}: TranslationCardListProps) => {
  if (translations.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-gray-300
          bg-white
          px-6
          py-12
          text-center
        "
      >
        <p className="text-sm text-gray-500">
          No keywords available.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
      aria-label="Word translations"
    >
      {translations.map((item) => (
        <TranslationCard
          key={item.id}
          item={item}
          language={language}
        />
      ))}
    </section>
  );
};