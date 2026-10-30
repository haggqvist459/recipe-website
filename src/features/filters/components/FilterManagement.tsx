import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/integrations/redux'
import { fetchCuisines, fetchMainIngredients, deleteFilterService, insertFilterService, updateFilterService } from '@/integrations/supabase/services'
import { LoadingComponent, Heading, Input, HorizontalMenuButton, IconButton } from '@/components/ui'
import { AddListItem } from '@/components/icons'
import { HorizontalMenuWrapper, ResponsiveWrapper } from '@/components/layout'
import { useLanguage, useNotification } from '@/contexts'
import { setFilterList, addFilter, deleteFilter, updateFilter } from '../slice'
import FilterManagementItem from './FilterManagementItem'
import { FilterCategoryType } from '@/shared/types'
import { handleError } from '@/errorHandling'
import { translateText } from '@/shared'

const FilterManagement = () => {

  const { language } = useLanguage()
  const { setModalState, resetModalState, showToast } = useNotification()
  const dispatch = useAppDispatch()

  const cuisines = useAppSelector(state => state.filters.cuisineFilters)
  const mainIngredients = useAppSelector(state => state.filters.mainIngredientFilters)

  const [loading, setLoading] = useState(false)
  const [newMainIngredient, setNewMainIngredient] = useState('')
  const [newCuisine, setNewCuisine] = useState('')

  const [activeFilter, setActiveFilter] = useState<"mainIngredients" | "cuisines">("mainIngredients")

  useEffect(() => {
    setLoading(true)

    const loadFilters = async () => {

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

    loadFilters()
  }, [])

  const handleUpdate = async (filterCategory: FilterCategoryType, filterId: string, updatedText: string) => {
    try {
      await updateFilterService(updatedText, filterCategory, filterId, language)
      dispatch(updateFilter({ filterCategory, filterId, updatedText, language }))
    } catch (error) {
      showToast(handleError(error), 'error')
    }
  }

  const handleDelete = (filterCategory: FilterCategoryType, filterId: string, filterText: string) => {
    setModalState({
      isOpen: true,
      showCancel: true,
      title: translateText('filterManagement', 'deleteFilterTitle', language),
      message: `${translateText('filterManagement', 'deleteFilterMessage', language)}"${filterText}"?`,
      onConfirm: async () => {
        try {
          await deleteFilterService(filterCategory, filterId)
          dispatch(deleteFilter({ filterCategory, filterId }))
          resetModalState()
        } catch (error) {
          showToast(handleError(error), 'error')
          resetModalState()
        }
      },
      onCancel: () => resetModalState()
    })
  }

  const handleAdd = async (filterCategory: FilterCategoryType, filterText: string) => {
    try {
      const newFilter = await insertFilterService(filterCategory, filterText, language)
      dispatch(addFilter({ filterCategory, filter: newFilter }))
      if (filterCategory === 'mainIngredients') {
        setNewMainIngredient('')
      } else {
        setNewCuisine('')
      }
    } catch (error) {
      showToast(handleError(error), 'error')
    }
  }

  if (loading) return <LoadingComponent />


  return (
    <div className=''>
      <HorizontalMenuWrapper lgHidden={true}>
        <HorizontalMenuButton
          isActive={activeFilter === 'mainIngredients'}
          onClick={() => setActiveFilter('mainIngredients')}
        >
          {translateText('filterManagement', 'filterManagementMainIngredients', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton
          isActive={activeFilter === 'cuisines'}
          onClick={() => setActiveFilter('cuisines')}
        >
          {translateText('filterManagement', 'filterManagementCuisines', language)}
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <div className="min-h-screen overflow-y-auto space-y-2 bg-marblewhite p-2">
        <ResponsiveWrapper isActive={activeFilter === 'mainIngredients'}>
          <div className="hidden lg:block lg:py-2">
            <Heading title='Categories' headingType='sub-heading' />
          </div>
          <div className="bg-ceramic rounded-lg border-secondary p-5 space-y-5">
            {mainIngredients.map(mainIngredient => (
              <FilterManagementItem
                key={mainIngredient.id}
                filter={mainIngredient}
                onDelete={() => handleDelete('mainIngredients', mainIngredient.id, mainIngredient[`${language}_text`])}
                onUpdate={(updatedText) => handleUpdate('mainIngredients', mainIngredient.id, updatedText)}
              />
            ))}
            <div className="flex justify-between items-center space-x-2 mt-5">
              <Input
                id='addMainIngredient'
                onChange={(e) => setNewMainIngredient(e.target.value)}
                placeholder={translateText('filterManagement', 'newMainIngredient', language)}
                value={newMainIngredient}
              />
              <IconButton onClick={() => handleAdd('mainIngredients', newMainIngredient)}>
                <AddListItem size='size-8' />
              </IconButton>
            </div>
          </div>
        </ResponsiveWrapper>
        <ResponsiveWrapper isActive={activeFilter === 'cuisines'}>
          <div className="hidden lg:block lg:py-2">
            <Heading title='Cuisines' headingType='sub-heading' />
          </div>
          <div className="bg-ceramic rounded-lg border-secondary p-5 space-y-5">
            {cuisines.map(cuisine => (
              <FilterManagementItem
                key={cuisine.id}
                filter={cuisine}
                onDelete={() => handleDelete('cuisines', cuisine.id, cuisine[`${language}_text`])}
                onUpdate={(updatedText) => handleUpdate('cuisines', cuisine.id, updatedText)}
              />
            ))}
            <div className="flex justify-between items-center space-x-2 mt-5">
              <Input
                id='addCuisine'
                onChange={(e) => setNewCuisine(e.target.value)}
                placeholder={translateText('filterManagement', 'newCuisine', language)}
                value={newCuisine}
              />
              <IconButton onClick={() => handleAdd('cuisines', newCuisine)}>
                <AddListItem size='size-8' />
              </IconButton>
            </div>
          </div>
        </ResponsiveWrapper>
      </div>
    </div>
  )
}

export default FilterManagement