import { useState } from 'react'
import { ArrowIcon, HorizontalMenuWrapper } from '@/components'
import { SORTING_FILTERS } from '../constants'
import { SortingFilterKey } from '../types'
import { FilterOptionType } from '@/types'
import { useLanguage } from '@/contexts'
import { translateText } from '@/utils'

type Props = {
  typeFilters: FilterOptionType[] | []
  selectedTypeFilters: FilterOptionType[] | []
  cuisineFilters: FilterOptionType[] | []
  selectedCuisineFilters: FilterOptionType[] | []
  selectedSortingFilter: SortingFilterKey
  onToggleFilter: (filterCategory: 'types' | 'cuisines', filter: FilterOptionType) => void,
  onSetSorting: (sorting: SortingFilterKey) => void
}

const Filters = ({
  typeFilters,
  selectedTypeFilters,
  cuisineFilters,
  selectedCuisineFilters,
  selectedSortingFilter,
  onToggleFilter,
  onSetSorting
}: Props) => {

  const { language } = useLanguage()
  const [showTypes, setShowTypes] = useState(false)
  const [showCuisines, setShowCuisines] = useState(false)
  const [showSort, setShowSort] = useState(false)

  return (
    <div className="px-3 w-full bg-primary flex flex-col items-center mx-auto">
      <HorizontalMenuWrapper>
          <button
            className="flex space-x-1 items-center"
            onClick={() => setShowTypes(prev => !prev)}
            disabled={typeFilters.length === 0}
          >
            {translateText('filter', 'category', language)}
            <div
              className={`transform transition-transform duration-300 ease-in-out disabled:opacity-50 ${showTypes ? 'rotate-0' : '-rotate-90'
                }`}
            >
              <ArrowIcon strokeWidth={3} />
            </div>
          </button>
          <button
            className="flex space-x-1 items-center"
            onClick={() => setShowCuisines(prev => !prev)}
            disabled={cuisineFilters.length === 0}
          >
            {translateText('filter', 'cuisines', language)}
            <div
              className={`transform transition-transform duration-300 ease-in-out disabled:opacity-50 ${showCuisines ? 'rotate-0' : '-rotate-90'
                }`}
            >
              <ArrowIcon strokeWidth={3} />
            </div>
          </button>
          <button
            className="flex space-x-1 items-center"
            onClick={() => setShowSort(prev => !prev)}
          >
            {translateText('filter', 'sort', language)}
            <div
              className={`transform transition-transform duration-300 ease-in-out ${showSort ? 'rotate-0' : '-rotate-90'
                }`}
            >
              <ArrowIcon strokeWidth={3} />
            </div>
          </button>
      </HorizontalMenuWrapper>
      <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className={`flex px-2 items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap space-x-4 duration-300 ease-in-out ${showTypes ? 'translate-y-0 h-[32px]' : '-translate-y-full h-0'}`}>
          {typeFilters.map(typeFilter => (
            <span
              key={typeFilter.id}
              className={
                selectedTypeFilters.some(selected => selected.id === typeFilter.id)
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => onToggleFilter("types", typeFilter)}
            >
              {typeFilter.text}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent" />
      </div>

      <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className={`flex px-2 items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap space-x-4 duration-300 ease-in-out ${showCuisines ? 'translate-y-0 h-[32px]' : '-translate-y-full h-0'}`}>
          {cuisineFilters.map(cuisineFilter => (
            <span
              key={cuisineFilter.id}
              className={
                selectedCuisineFilters.some(selected => selected.id === cuisineFilter.id)
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => onToggleFilter('cuisines', cuisineFilter)}
            >
              {cuisineFilter.text}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent" />
      </div>

      <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className={`flex px-2 items-center justify-center overflow-x-auto whitespace-nowrap space-x-4 duration-300 ease-in-out ${showSort ? 'translate-y-0 h-[32px]' : '-translate-y-full h-0'}`}>
          {Object.entries(SORTING_FILTERS).map(([sortingKey, sortingData]) => (
            <span
              key={sortingKey}
              className={
                selectedSortingFilter === sortingKey
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => onSetSorting(sortingKey as SortingFilterKey)}
            >
              {sortingData[language]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters;