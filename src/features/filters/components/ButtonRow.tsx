import { FilterOptionType } from "@/types";

const BG_CLASSES = [
  "bg-lightblue",
  "bg-darkblue",
  "bg-purple",
  "bg-pink",
  "bg-orange",
  "bg-yellow",
  "bg-green",
] as const;

const BORDER_CLASSES = [
  "border-lightblue",
  "border-darkblue",
  "border-purple",
  "border-pink",
  "border-orange",
  "border-yellow",
  "border-green",
] as const;

type Props = {
  items: FilterOptionType[];
  selected: FilterOptionType[] | null;
  filterCategory: "types" | "cuisines";
  onClick: (filterCategory: "types" | "cuisines", filter: FilterOptionType) => void;
  reverse?: boolean
  largePattern?: boolean
};

const ButtonRow = ({ items, selected = [], filterCategory, onClick, reverse = false, largePattern = false }: Props) => {
  const rows: React.ReactNode[] = [];
  const pattern = largePattern ? [4,5] : [3,4];
  let index = 0;
  let patternIndex = 0;

  while (index < items.length) {
    const rowSize = pattern[patternIndex % pattern.length];
    const rowItems = items.slice(index, index + rowSize);

    rows.push(
      <div key={index} className="flex flex-wrap justify-center gap-2 my-2">
        {rowItems.map((item, i) => {
          const colorIndex = (index + i) % BG_CLASSES.length;
          const bg = (reverse ? [...BG_CLASSES].reverse() : BG_CLASSES)[colorIndex];
          const border = selected?.some((s) => s.id === item.id)
            ? "border-primary-text font-medium"
            : (reverse ? [...BORDER_CLASSES].reverse() : BORDER_CLASSES)[colorIndex];

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onClick(filterCategory, item)}
              className={`${bg} ${border} text-primary-text text-sm py-1 px-2.5 border-2 rounded-2xl`}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    );

    index += rowSize;
    patternIndex++;
  }

  return <>{rows}</>;
};

export default ButtonRow;