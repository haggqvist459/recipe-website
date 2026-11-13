import { useEffect, useState } from "react"
import { Heading, IconButton, LoadingComponent } from "@/components/ui"
import { fetchMainIngredients, fetchCuisines } from "@/integrations/supabase/services"
import { setFilterList } from "@/features/filters"
import { handleError } from "@/errorHandling"
import { ButtonRow } from "@/features/filters"
import { useAppDispatch, useAppSelector } from "@/integrations/redux"
import { FilterOptionType } from "@/shared/types"
import { useNotification } from "@/contexts"
import { CircleMinus } from "@/components/icons"


const Planner = () => {

  const { showToast } = useNotification()
  const dispatch = useAppDispatch()
  const mainIngredientFilters = useAppSelector(state => state.filters.mainIngredientFilters)
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters)

  const [plannerSetting, setPlannerSetting] = useState<'random' | 'custom'>('random')
  const [selectedMainIngredientFilters, setSelectedMainIngredientFilters] = useState<FilterOptionType[]>([])
  const [selectedCuisineFilters, setSelectedCuisineFilters] = useState<FilterOptionType[]>([])
  const [loading, setLoading] = useState(false)
  // const [days, setDays] = useState(0)
  // const [servings, setServing] = useState(0)

  useEffect(() => {

    const loadFilters = async () => {
      setLoading(true)
      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          fetchMainIngredients(),
          fetchCuisines(),
        ])

        dispatch(setFilterList({ filterCategory: "mainIngredients", list: typesResult }))
        dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult }))

      } catch (error) {
        showToast(handleError(error), 'error')
      } finally {
        setLoading(false)
      }

    }

    if (mainIngredientFilters.length === 0 || cuisineFilters.length === 0) {
      loadFilters()
    }

  }, [])

  if (loading) return (
    <div className="w-full bg-marblewhite min-h-[80dvh] pt-5 px-5">
      <LoadingComponent />
    </div>)

  return (
    <div className="w-full space-y-5 bg-marblewhite min-h-[80dvh] overflow-y-auto pt-5 px-5">
      <Heading title="Meal Planning" headingType="main-heading" />
      <div className="relative flex mt-5 rounded-lg p-1 bg-ceramic">
        <div
          className={`absolute inset-y-1 left-1 right-1/2 rounded-lg bg-primary transition-transform duration-300 ${plannerSetting === 'custom' ? 'translate-x-full' : ''}`}
        />
        <button
          className={`relative w-full p-2 font-semibold transition-colors duration-300 ${plannerSetting === 'random' ? 'text-ceramic' : 'text-primary-text'}`}
          onClick={() => setPlannerSetting('random')}
        >
          Random
        </button>
        <button
          className={`relative w-full p-2 font-semibold transition-colors duration-300 ${plannerSetting === 'custom' ? 'text-ceramic' : 'text-primary-text'}`}
          onClick={() => setPlannerSetting('custom')}
        >
          Custom
        </button>
      </div>
      <div className={`mt-5 overflow-hidden transition-all duration-200 ease-in-out ${plannerSetting === 'custom' ? 'max-h-70' : 'max-h-0'}`}>
        <div className={`space-y-5 duration-200 ease-in-out ${plannerSetting === 'custom' ? 'translate-y-0' : ' -translate-y-full'}`}>
          <div className="p-3 bg-ceramic rounded-lg">
            <Heading title="Main ingredients" headingType="small-heading" />
            <ButtonRow
              items={mainIngredientFilters}
              selected={selectedMainIngredientFilters}
              onClick={(filter) => setSelectedMainIngredientFilters(prev =>
                prev.includes(filter) ? prev.filter(item => item !== filter) : [...prev, filter]
              )}
            />
          </div>
          <div className="p-3 bg-ceramic rounded-lg">
            <Heading title="Cuisines" headingType="small-heading" />
            <ButtonRow
              items={cuisineFilters}
              selected={selectedCuisineFilters}
              onClick={(filter) => setSelectedCuisineFilters(prev =>
                prev.includes(filter) ? prev.filter(item => item !== filter) : [...prev, filter]
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex bg-ceramic p-3 w-full">
        <span className="font-semibold text-primary-text">Number of days:</span>
        <div className="flex">
            <IconButton onClick={() => {}}>
              <CircleMinus colour="text-primary" size='size-8'/>
            </IconButton>
            <span className=""></span>
        </div>
      </div>
      <div className="flex">
        <span className="font-semibold text-primary-text">Servings per meal:</span>
      </div>
    </div>
  )
}

export default Planner
