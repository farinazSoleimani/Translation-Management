import type { Language, TranslationItem } from '../../types/translation';

interface TranslationCardProps {
  item: TranslationItem;
  language: Language;
}

export const TranslationCard = ({
  item,
  language,
}: TranslationCardProps) => {
  const translation = item.translations[language];

  return (
    <article
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="min-w-0">
        <p
          className="
            truncate
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-gray-400
          "
          title={item.keyword}
        >
          {item.keyword}
        </p>

        {translation ? (
          <p
            className="
              mt-2
              break-words
              text-base
              font-medium
              leading-6
              text-gray-900
            "
          >
            {translation}
          </p>
        ) : (
          <p
            className="
              mt-2
              text-sm
              italic
              text-gray-400
            "
          >
            No translation yet
          </p>
        )}
      </div>
    </article>
  );
};