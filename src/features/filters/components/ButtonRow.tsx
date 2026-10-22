import { FilterOptionType } from "@/shared/types"
import { useLanguage } from "@/contexts"
import { getCategoryColourClasses } from "../helpers/categoryColours"

type Props = {
  items: FilterOptionType[]
  selected: FilterOptionType[] | null
  onClick: (filter: FilterOptionType) => void
  reverse?: boolean
  largePattern?: boolean
}

const ButtonRow = ({ items, selected = [], onClick, largePattern = false }: Props) => {
  const { language } = useLanguage()
  const rows: React.ReactNode[] = []
  const pattern = largePattern ? [4, 5] : [3, 4]

  let index = 0
  let patternIndex = 0

  while (index < items.length) {
    const rowSize = pattern[patternIndex % pattern.length]
    const rowItems = items.slice(index, index + rowSize)

    rows.push(
      <div key={index} className="flex flex-wrap justify-center gap-2 my-2">
        {rowItems.map((item) => {
          const { bg, bgPale2 } = getCategoryColourClasses(item.categoryCounter)
          const backGroundColour = selected?.some((s) => s.id === item.id) ? bg : bgPale2

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onClick(item)}
              className={`${backGroundColour} text-white text-sm py-1 px-2.5 border-2 rounded-2xl`}
            >
              {item[`${language}_text`]}
            </button>
          )
        })}
      </div>
    )

    index += rowSize
    patternIndex++
  }

  return <>{rows}</>
}

export default ButtonRow