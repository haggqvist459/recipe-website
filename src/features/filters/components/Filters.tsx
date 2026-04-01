import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux';
import { fetchCuisines, fetchMainIngredients } from '@/supabase/services';
import { ArrowIcon, HorizontalMenuWrapper } from '@/components'
import { SORTING_FILTERS } from '../constants'
import { setFilterList, setActiveFilter, setActiveSorting } from '../slice';
import { SortingFilterKey } from '../types'
import { useLanguage, useNotification } from '@/contexts'
import { translateText } from '@/utils'



const Filters = () => {

  const { language } = useLanguage()
  const { showToast } = useNotification()
  const dispatch = useAppDispatch()

  const [showTypes, setShowTypes] = useState(false)
  const [showCuisines, setShowCuisines] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const typeFilters = useAppSelector(state => state.filters.typeFilters);
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters);
  const selectedTypeFilters = useAppSelector(state => state.filters.selectedTypeFilters);
  const selectedCuisineFilters = useAppSelector(state => state.filters.selectedCuisineFilters);
  const selectedSortingFilter = useAppSelector(state => state.filters.selectedSortingFilter);

  const [typesError, setTypesError] = useState<string | null>(null)
  const [cuisinesError, setCuisinesError] = useState<string | null>(null)

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const result = await fetchMainIngredients()
        dispatch(setFilterList({ filterCategory: "types", list: result }))
        setTypesError(null)
      } catch (error) {
        if (typeof error === 'string') {
          showToast(error, 'error')
          setTypesError(error)
        } else {
          showToast('Failed to load ingredient filters.', 'error')
          setTypesError('Failed to load ingredient filters.')
        }
        
      }
    }

    const loadCuisines = async () => {
      try {
        const result = await fetchCuisines()
        dispatch(setFilterList({ filterCategory: "cuisines", list: result }))
        setCuisinesError(null)
      } catch (error) {
        if (typeof error === 'string') {
          showToast(error, 'error')
          setCuisinesError(error)
        } else {
          showToast('Failed to load cuisine filters.', 'error')
          setCuisinesError('Failed to load cuisine filters.')
        }
        
      }
    }

    loadTypes()
    loadCuisines()
  }, [])

  return (
    <div className="px-3 w-full bg-primary flex flex-col items-center mx-auto">
      <HorizontalMenuWrapper>
        <button
          className="flex space-x-1 items-center disabled:opacity-50"
          onClick={() => setShowTypes(prev => !prev)}
          disabled={typesError === null}
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
          className="flex space-x-1 items-center disabled:opacity-50"
          onClick={() => setShowCuisines(prev => !prev)}
          disabled={cuisinesError === null}
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
            <button
              key={typeFilter.id}
              className={
                selectedTypeFilters.some(selected => selected.id === typeFilter.id)
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => dispatch(setActiveFilter({ filterCategory: "types", filter: typeFilter }))}
            >
              {typeFilter[`${language}_text`]}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent" />
      </div>

      <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className={`flex px-2 items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap space-x-4 duration-300 ease-in-out ${showCuisines ? 'translate-y-0 h-[32px]' : '-translate-y-full h-0'}`}>
          {cuisineFilters.map(cuisineFilter => (
            <button
              key={cuisineFilter.id}
              className={
                selectedCuisineFilters.some(selected => selected.id === cuisineFilter.id)
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => dispatch(setActiveFilter({ filterCategory: "cuisines", filter: cuisineFilter }))}
            >
              {cuisineFilter[`${language}_text`]}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent" />
      </div>

      <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className={`flex px-2 items-center justify-center overflow-x-auto whitespace-nowrap space-x-4 duration-300 ease-in-out ${showSort ? 'translate-y-0 h-[32px]' : '-translate-y-full h-0'}`}>
          {Object.entries(SORTING_FILTERS).map(([sortingKey, sortingData]) => (
            <button
              key={sortingKey}
              className={
                selectedSortingFilter === sortingKey
                  ? 'text-primary-text underline decoration-2'
                  : 'text-primary-text font-light'
              }
              onClick={() => dispatch(setActiveSorting(sortingKey as SortingFilterKey))}
            >
              {sortingData[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters;