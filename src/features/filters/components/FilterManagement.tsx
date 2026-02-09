import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchCuisines, fetchMainIngredients, deleteFilterService, insertFilterService, updateFilterService } from '@/supabase/services';
import { LoadingComponent, ErrorComponent, Heading, AddListItem, Input, HorizontalMenuButton, HorizontalMenuWrapper } from '@/components';
import { useLanguage } from '@/contexts';
import { setFilterList, addFilter, deleteFilter } from '../slice';
import FilterManagementItem from './FilterManagementItem';
import { FilterCategoryType } from '@/types';

const FilterManagement = () => {

  const { language } = useLanguage();
  const dispatch = useAppDispatch();

  const cuisines = useAppSelector(state => state.filters.cuisineFilters)
  const types = useAppSelector(state => state.filters.typeFilters)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [newType, setNewType] = useState('')
  const [newCuisine, setNewCuisine] = useState('')

  const [activeFilter, setActiveFilter] = useState<"types" | "cuisines">("types")

  useEffect(() => {
    setError(false);
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
        console.error("Failed to fetch filter options", error);
        if (error instanceof Error) {
          setErrorMessage(error.message)
        }
        setError(true);
      } finally {
        setLoading(false)
      }
    };

    loadFilters();
  }, []);

  const handleUpdate = async (filterCategory: FilterCategoryType, filterId: string, updatedText: string) => {
    try {
      await updateFilterService(updatedText, filterCategory, filterId, language)
    } catch (error) {
      setError(true)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error occured while updating a filter.')
      }
    }
  }

  const handleDelete = async (filterCategory: FilterCategoryType, filterId: string) => {
    try {
      await deleteFilterService(filterCategory, filterId)
      dispatch(deleteFilter({ filterCategory, filterId }))
    } catch (error) {
      setError(true)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error occured while deleting a filter.')
      }
    }
  }

  const handleAdd = async (filterCategory: FilterCategoryType, filterText: string) => {
    try {
      const newFilter = await insertFilterService(filterCategory, filterText, language)
      dispatch(addFilter({filterCategory, filter: newFilter}))
    } catch (error) {
      setError(true)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error occured while deleting a filter.')
      }
    }
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
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
                  onDelete={() => handleDelete('types', type.id)}
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
              <button className="" onClick={() => handleAdd('types', newType)}>
                <AddListItem size='size-8' />
              </button>
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
                  onDelete={() => handleDelete('cuisines', cuisine.id)}
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
              <button className="" onClick={() => handleAdd('cuisines', newCuisine)}>
                <AddListItem size='size-8' />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterManagement;