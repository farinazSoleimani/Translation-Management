import type { ChangeEvent } from "react";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import type { Language, TranslationItem } from "../../types/translation";

interface SortableTranslationRowProps {
  item: TranslationItem;
  language: Language;
  onChange: (id: string, language: Language, value: string) => void;
}

export const SortableTranslationRow = ({
  item,
  language,
  onChange,
}: SortableTranslationRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  const value = item.translations[language];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(item.id, language, event.target.value);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex
        flex-col
        gap-3
        border-b
        border-gray-100
        bg-white
        px-4
        py-4
        last:border-b-0
        sm:flex-row
        sm:items-center
        ${isDragging ? "relative rounded-lg shadow-lg" : ""}
      `}>
      <div className="flex min-w-0 items-center gap-3 sm:flex-1">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="
            flex
            h-2
            w-2
            shrink-0
            cursor-grab
            touch-none
            items-center
            justify-center
            rounded-md
            text-gray-300
            transition
            hover:bg-gray-100
            hover:text-gray-500
            active:cursor-grabbing
          "
          aria-label={`Reorder ${item.keyword}`}>
          <span aria-hidden="true" className="text-lg leading-none">
            ⋮⋮
          </span>
        </button>

        <p
          className={`
    min-w-0
    truncate
    text-sm
    font-medium
    ${value ? "text-gray-800" : "text-red-500"}
  `}
          title={item.keyword}>
          {item.keyword}
        </p>
      </div>

      <div className="w-full sm:max-w-md sm:flex-1">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="..."
          className={`
            h-10
            w-full
            rounded-lg
            border
            text-center
            text-sm
            outline-none
            transition
            flex
            items-center

            ${
              value
                ? `
                  border-gray-200
                  text-gray-800
                  focus:border-gray-400
                  focus:ring-2
                  focus:ring-gray-100
                `
                : `
                  bg-red-400
                  text-white
                  placeholder:text-red-50
                  focus:border-red-300
                  focus:ring-2
align-middle
                  focus:ring-red-50
                `
            }
          `}
          aria-label={`${item.keyword} translation`}
        />
      </div>
    </div>
  );
};
