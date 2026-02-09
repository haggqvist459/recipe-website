import { FilterOptionType } from "@/types";
import { useLanguage } from "@/contexts";

const COLORS = ["lightblue", "darkblue", "purple", "pink", "orange", "yellow", "green"] as const;

type Props = {
  items: FilterOptionType[];
  selected: FilterOptionType[] | null;
  onClick: (filter: FilterOptionType) => void;
  reverse?: boolean;
  largePattern?: boolean;
};

const ButtonRow = ({ items, selected = [], onClick, reverse = false, largePattern = false }: Props) => {
  const { language } = useLanguage();
  const rows: React.ReactNode[] = [];
  const pattern = largePattern ? [4, 5] : [3, 4];
  const colors = reverse ? [...COLORS].reverse() : COLORS;
  
  let index = 0;
  let patternIndex = 0;

  while (index < items.length) {
    const rowSize = pattern[patternIndex % pattern.length];
    const rowItems = items.slice(index, index + rowSize);

    rows.push(
      <div key={index} className="flex flex-wrap justify-center gap-2 my-2">
        {rowItems.map((item, i) => {
          const colorIndex = (index + i) % COLORS.length;
          const color = colors[colorIndex];
          const isSelected = selected?.some((s) => s.id === item.id);
          
          const bg = `bg-${color}`;
          const border = isSelected ? "border-primary-text font-medium" : `border-${color}`;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onClick(item)}
              className={`${bg} ${border} text-primary-text text-sm py-1 px-2.5 border-2 rounded-2xl`}
            >
               {item[`${language}_text`]}
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