import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/integrations/redux/hooks"
import { fetchMainIngredients, fetchCuisines } from "@/integrations/supabase/services"
import { updateMetadataField, selectMetadata, setCurrentSection, toggleFilter } from "@/features/recipeForms"
import { setFilterList, ButtonRow } from "@/features/filters"
import { FilterOptionType } from '@/shared/types'
import SectionWrapper from "../shared/SectionWrapper"
import { Input, ToggleButton, Heading, LoadingComponent, ErrorComponent, IconButton } from "@/components/ui"
import { CircleMinus, CirclePlus } from "@/components/icons"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { handleError } from "@/errorHandling"

type Props = {
  handleNavigation?: (action: () => void) => void
}

const MetaDataSection = ({ handleNavigation }: Props) => {

  const { language } = useLanguage()

  const metadata = useAppSelector(selectMetadata)
  const typeFilters = useAppSelector(state => state.filters.mainIngredientFilters)
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters)
  const errors = useAppSelector(state => state.recipeForms.errors)

  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState({
    title: metadata.title,
    description: metadata.description,
  })


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleFilterToggle = (filterCategory: "mainIngredients" | "cuisines", filter: FilterOptionType) => {
    dispatch(toggleFilter({ filterCategory, filter }))
  }

  useEffect(() => {
    const shouldFetchTypes = typeFilters.length === 0
    const shouldFetchCuisines = cuisineFilters.length === 0

    if (!shouldFetchTypes && !shouldFetchCuisines) {   
      setLoading(false)
      return
    }

    const loadFilters = async () => {
      setError(null)
      setLoading(true)

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          fetchMainIngredients(),
          fetchCuisines(),
        ])
        dispatch(setFilterList({ filterCategory: "mainIngredients", list: typesResult }))
        dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult }))

      } catch (err) {
        const errorMessage = handleError(err)
        setError(errorMessage)
      }

      setLoading(false)
    }

    loadFilters()
  }, [])

  useEffect(() => {
    setLocalMetadata({
      title: metadata.title,
      description: metadata.description,
    })
  }, [metadata.title, metadata.description])

  if (loading) return (<SectionWrapper><LoadingComponent /></SectionWrapper>)
  if (error) return (<SectionWrapper><ErrorComponent errorMessage={error} /></SectionWrapper>)

  return (
    <SectionWrapper>
      <div className="flex justify-between">
        <Heading title={translateText('metadata', 'create', language)} />
      </div>
      <div className="flex flex-col">
        <div className="space-y-2">
          <Input
            required={true}
            id="recipeTitle"
            label={translateText("metadata", "title", language)}
            placeholder="..."
            value={localMetadata.title}
            onChange={(e) =>
              setLocalMetadata(prev => ({ ...prev, title: e.target.value }))
            }
            onBlur={() => {
              if (localMetadata.title !== metadata.title) {
                dispatch(updateMetadataField({ key: "title", value: localMetadata.title }))
              }
            }}
            error={errors.title}
            classnameOverride="p-2"
          />
          <Input
            id="recipeDescription"
            label={translateText("metadata", "description", language)}
            multiline={true}
            placeholder="..."
            value={localMetadata.description ?? ""}
            onChange={(e) =>
              setLocalMetadata(prev => ({ ...prev, description: e.target.value }))
            }
            onBlur={() => {
              if (localMetadata.description !== metadata.description) {
                dispatch(updateMetadataField({ key: "description", value: localMetadata.description }))
              }
            }}
            classnameOverride="p-2"
          />
          <div className="flex flex-col space-y-2 md:flex-row space-x-2 md:space-y-0">
            <div className="p-2 w-full flex justify-between items-center bg-marblewhite rounded-lg">
              <div className="flex flex-col">
                <span className="label">Meal Planner</span>
                <span className="text-sm font-light text-primary-text">Inclusion</span>
              </div>
              <div className="flex flex-col items-end pr-2">
                <ToggleButton
                  isToggled={metadata.includeWeekly}
                  onToggle={() => { dispatch(updateMetadataField({ key: "includeWeekly", value: !metadata.includeWeekly })) }}
                />
              </div>
            </div>
            <div className={`flex w-full bg-marblewhite justify-between p-2 items-center rounded-lg ${errors.servings ? 'border-red-600 border-1' : 'border-1 border-marblewhite'}`}>
              <span className="label">{translateText('metadata', 'servings', language)}</span>
              <div className="flex items-center space-x-2">
                <IconButton
                  className="p-1"
                  disabled={metadata.servings <= 0}
                  onClick={() => dispatch(updateMetadataField({ key: "servings", value: Math.max(0, metadata.servings - 1) }))}
                >
                  <CircleMinus size="size-7" colour="text-primary" />
                </IconButton>
                <span className="label">{metadata.servings}</span>
                <IconButton
                  className="p-1"
                  disabled={metadata.servings >= 20}
                  onClick={() => dispatch(updateMetadataField({ key: "servings", value: Math.min(20, metadata.servings + 1) }))}
                >
                  <CirclePlus size="size-7" colour="text-primary" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full">
              <Heading title={translateText("metadata", "selectCategory", language)} headingType="sub-heading" />
              <ButtonRow
                selected={metadata.mainIngredients}
                items={typeFilters}
                onClick={(filter) => handleFilterToggle("mainIngredients", filter)}
                largePattern={true}
              />
            </div>
            <div className="w-full">
              <Heading title={translateText("metadata", "selectCuisine", language)} headingType="sub-heading" />
              <ButtonRow
                selected={metadata.cuisines}
                items={cuisineFilters}
                onClick={(filter) => handleFilterToggle("cuisines", filter)}
              />
            </div>
          </div>
      </div>
    </div>
      {
    handleNavigation && (
      <div className="w-full flex justify-end space-x-2 lg:hidden">
        <button
          type="button"
          disabled={loading || !error === null}
          className="w-1/2 bg-primary font-medium text-ceramic rounded disabled:opacity-50 button-click"
          onClick={() =>
            handleNavigation(() => dispatch(setCurrentSection("Ingredients")))
          }
        >
          {translateText("buttons", "next", language)}
        </button>
      </div>
    )
  }
    </SectionWrapper >
  )
}

export default MetaDataSection