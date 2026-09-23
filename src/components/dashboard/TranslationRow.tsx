import type { ChangeEvent } from 'react';

import type {
  Language,
  TranslationItem,
} from '../../types/translation';

interface TranslationRowProps {
  item: TranslationItem;
  language: Language;
  onChange: (
    id: string,
    language: Language,
    value: string,
  ) => void;
}

export const TranslationRow = ({
  item,
  language,
  onChange,
}: TranslationRowProps) => {
  const value = item.translations[language];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(
      item.id,
      language,
      event.target.value,
    );
  };

  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        border-b
        border-gray-100
        px-4
        py-4
        last:border-b-0
      "
    >
      <button
        type="button"
        className="
          cursor-grab
          touch-none
          select-none
          text-lg
          leading-none
          text-gray-300
          transition
          hover:text-gray-500
          active:cursor-grabbing
        "
        aria-label={`Reorder ${item.keyword}`}
      >
        ⋮⋮
      </button>

      <div className="min-w-0 flex-1">
        <p
          className="
            truncate
            text-sm
            font-medium
            text-gray-800
          "
          title={item.keyword}
        >
          {item.keyword}
        </p>
      </div>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="No translation yet"
          className={`
            h-10
            w-full
            rounded-lg
            border
            px-3
            text-sm
            outline-none
            transition
            ${
              value
                ? 'border-gray-200 text-gray-800 focus:border-gray-400 focus:ring-2 focus:ring-gray-100'
                : 'border-red-200 bg-red-50 text-red-600 placeholder:text-red-400 focus:border-red-300 focus:ring-2 focus:ring-red-50'
            }
          `}
          aria-label={`${item.keyword} translation`}
        />
      </div>
    </div>
  );
};