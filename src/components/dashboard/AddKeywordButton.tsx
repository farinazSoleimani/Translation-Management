interface AddKeywordButtonProps {
  onClick: () => void;
}

export const AddKeywordButton = ({
  onClick,
}: AddKeywordButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-gray-200
        bg-white
        px-5
        text-sm
        font-medium
        text-gray-700
        shadow-sm
        transition
        hover:border-gray-300
        hover:bg-gray-50
        active:scale-[0.99]
      "
    >
      <span className="text-lg leading-none">+</span>

      <span>Add keyword</span>
    </button>
  );
};