import type { Language, TranslationItem } from "../../types/translation";

interface TranslationCardProps {
  item: TranslationItem;
  language: Language;
}

export const TranslationCard = ({ item, language }: TranslationCardProps) => {
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
      ">
      <div className="min-w-0">
        <p
          className="
            truncate
            text-base
            font-medium
            uppercase
            tracking-
             text-gray-900
          "
          title={item.keyword}>
          {item.keyword}
        </p>

        {translation ? (
          <p
            className="
              mt-2
              wrap-break-word
              font-medium
              text-sm
            text-gray-400

              leading-6

            ">
            {translation}
          </p>
        ) : (
          <p
            className="
              mt-2
              text-sm
              italic
              text-gray-400
            ">
            ...
          </p>
        )}
      </div>
    </article>
  );
};
