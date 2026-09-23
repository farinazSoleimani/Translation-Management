import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type {
  Language,
  TranslationItem,
} from "../../types/translation";

import { SortableTranslationRow } from "./SortableTranslationRow";

interface TranslationListProps {
  translations: TranslationItem[];
  language: Language;
  onChange: (
    id: string,
    language: Language,
    value: string,
  ) => void;
  onReorder: (
    activeId: string,
    overId: string,
  ) => void;
}

export const TranslationList = ({
  translations,
  language,
  onChange,
  onReorder,
}: TranslationListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter:
        sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (
    event: DragEndEvent,
  ) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    onReorder(
      String(active.id),
      String(over.id),
    );
  };

  if (translations.length === 0) {
    return (
      <section
        className="
          rounded-xl
          border
          border-dashed
          border-gray-200
          bg-gray-50
          px-6
          py-12
          text-center
        "
        aria-label="Translation list"
      >
        <p className="text-sm text-gray-500">
          No keywords available.
        </p>
      </section>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={translations.map(
          (item) => item.id,
        )}
        strategy={verticalListSortingStrategy}
      >
        <section
          className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
          "
          aria-label="Translation list"
        >
          {translations.map((item) => (
            <SortableTranslationRow
              key={item.id}
              item={item}
              language={language}
              onChange={onChange}
            />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
};