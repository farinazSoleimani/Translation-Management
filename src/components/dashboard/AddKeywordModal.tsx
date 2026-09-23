import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import type { Language } from '../../types/translation';

interface AddKeywordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    keyword: string,
    language: Language,
    translation: string,
  ) => boolean;
}

const languageOptions: Array<{
  value: Language;
  label: string;
}> = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'fa',
    label: 'فارسی',
  },
  {
    value: 'de',
    label: 'German',
  },
];

export const AddKeywordModal = ({
  open,
  onClose,
  onSubmit,
}: AddKeywordModalProps) => {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] =
    useState<Language>('fa');
  const [translation, setTranslation] =
    useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setKeyword('');
      setLanguage('fa');
      setTranslation('');
      setError('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedKeyword =
      keyword.trim();

    const trimmedTranslation =
      translation.trim();

    if (!trimmedKeyword) {
      setError('Please enter a keyword.');
      return;
    }

    if (!trimmedTranslation) {
      setError(
        'Please enter a translation.',
      );
      return;
    }

    const wasAdded = onSubmit(
      trimmedKeyword,
      language,
      trimmedTranslation,
    );

    if (!wasAdded) {
      setError(
        'This keyword already exists.',
      );
      return;
    }

    onClose();
  };

  const clearError = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
        px-4
      "
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-keyword-title"
      >
        <div className="mb-5">
          <h2
            id="add-keyword-title"
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Add keyword
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Add a new keyword and its
            translation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="keyword"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Keyword
            </label>

            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(event) => {
                setKeyword(
                  event.target.value,
                );
                clearError();
              }}
              autoFocus
              placeholder="e.g. Dashboard"
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                text-sm
                outline-none
                transition
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-100
              "
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="language"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Language
            </label>

            <select
              id="language"
              value={language}
              onChange={(event) => {
                setLanguage(
                  event.target.value as Language,
                );
                clearError();
              }}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-100
              "
            >
              {languageOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="translation"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Translation
            </label>

            <input
              id="translation"
              type="text"
              value={translation}
              onChange={(event) => {
                setTranslation(
                  event.target.value,
                );
                clearError();
              }}
              placeholder="Enter translation"
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                text-sm
                outline-none
                transition
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-100
              "
            />
          </div>

          {error && (
            <p
              className="
                mt-3
                text-sm
                text-red-500
              "
              role="alert"
            >
              {error}
            </p>
          )}

          <div
            className="
              mt-6
              flex
              justify-end
              gap-3
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                h-10
                rounded-lg
                px-4
                text-sm
                font-medium
                text-gray-600
                transition
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                !keyword.trim() ||
                !translation.trim()
              }
              className="
                h-10
                rounded-lg
                bg-gray-900
                px-4
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Add keyword
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};