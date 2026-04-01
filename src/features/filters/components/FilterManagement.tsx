import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchCuisines, fetchMainIngredients, deleteFilterService, insertFilterService, updateFilterService } from '@/supabase/services';
import { LoadingComponent, ErrorComponent, Heading, AddListItem, Input, HorizontalMenuButton, HorizontalMenuWrapper, IconButton } from '@/components';
import { useLanguage, useNotification } from '@/contexts';
import { setFilterList, addFilter, deleteFilter, updateFilter } from '../slice';
import FilterManagementItem from './FilterManagementItem';
import { FilterCategoryType } from '@/types';

const FilterManagement = () => {

  const { language } = useLanguage();
  const { setModalState, resetModalState } = useNotification();
  const dispatch = useAppDispatch();

  const cuisines = useAppSelector(state => state.filters.cuisineFilters)
  const types = useAppSelector(state => state.filters.typeFilters)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newType, setNewType] = useState('')
  const [newCuisine, setNewCuisine] = useState('')

  const [activeFilter, setActiveFilter] = useState<"types" | "cuisines">("types")

  useEffect(() => {
    setError(null);
    setLoading(true)

    const loadFilters = async () => {

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          fetchMainIngredients(),
          fetchCuisines(),
        ]);

        dispatch(setFilterList({ filterCategory: "types", list: typesResult }));
        dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult }));

      } catch (error) {
        setError(typeof error === 'string' ? error : 'An unknown error has occurred while attempting to load the recipes.')
      } finally {
        setLoading(false)
      }
    };

    loadFilters();
  }, []);

  const handleUpdate = async (filterCategory: FilterCategoryType, filterId: string, updatedText: string) => {
    try {
      await updateFilterService(updatedText, filterCategory, filterId, language)
      dispatch(updateFilter({ filterCategory, filterId, updatedText, language }))
    } catch (error) {
      setError(typeof error === 'string' ? error : 'An unknown error has occurred while attempting to load the recipes.')
    }
  }

  const handleDelete = (filterCategory: FilterCategoryType, filterId: string, filterText: string) => {
    setModalState({
      isOpen: true,
      showCancel: true,
      title: 'Delete Filter',
      message: `Are you sure you want to delete the filter "${filterText}"?`,
      onConfirm: async () => {
        try {
          await deleteFilterService(filterCategory, filterId)
          dispatch(deleteFilter({ filterCategory, filterId }))
          resetModalState()
        } catch (error) {
          setError(typeof error === 'string' ? error : 'An unknown error has occurred while attempting to load the recipes.')
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
      if (filterCategory === 'types') {
        setNewType('')
      } else {
        setNewCuisine('')
      }
    } catch (error) {
      setError(typeof error === 'string' ? error : 'An unknown error has occurred while attempting to load the recipes.')
    }
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <HorizontalMenuWrapper>
        <HorizontalMenuButton
          isActive={activeFilter === 'types'}
          onClick={() => setActiveFilter('types')}
        >
          Main Ingredients
        </HorizontalMenuButton>
        <HorizontalMenuButton
          isActive={activeFilter === 'cuisines'}
          onClick={() => setActiveFilter('cuisines')}
        >
          Cuisines
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>

      <div className='px-5 w-full mt-5 mb-10'>
        {activeFilter === 'types' && (
          <div className="w-full flex flex-col">
            <div className="flex justify-center">
              <Heading title='Main Ingredients' headingType='sub-heading' />
            </div>
            <div className="flex-grow">
              {types.map(type => (
                <FilterManagementItem
                  key={type.id}
                  filter={type}
                  onDelete={() => handleDelete('types', type.id, type[`${language}_text`])}
                  onUpdate={(updatedText) => handleUpdate('types', type.id, updatedText)}
                />
              ))}
            </div>
            <div className="flex justify-between items-center space-x-2 pt-5 mt-auto mb-2">
              <Input
                id='addType'
                onChange={(e) => setNewType(e.target.value)}
                placeholder='New type'
                value={newType}
              />
              <IconButton onClick={() => handleAdd('types', newType)}>
                <AddListItem size='size-8' />
              </IconButton>
            </div>
          </div>
        )}

        {activeFilter === 'cuisines' && (
          <div className="w-full flex flex-col">
            <div className="flex justify-center">
              <Heading title='Cuisines' headingType='sub-heading' />
            </div>
            <div className="flex-grow">
              {cuisines.map(cuisine => (
                <FilterManagementItem
                  key={cuisine.id}
                  filter={cuisine}
                  onDelete={() => handleDelete('cuisines', cuisine.id, cuisine[`${language}_text`])}
                  onUpdate={(updatedText) => handleUpdate('cuisines', cuisine.id, updatedText)}
                />
              ))}
            </div>
            <div className="flex justify-between items-center space-x-2 pt-5 mb-2 mt-auto">
              <Input
                id='addCuisine'
                onChange={(e) => setNewCuisine(e.target.value)}
                placeholder='New cuisine'
                value={newCuisine}
              />
              <IconButton onClick={() => handleAdd('cuisines', newCuisine)}>
                <AddListItem size='size-8' />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterManagement;