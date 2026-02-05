import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchCuisines, fetchMainIngredients } from '@/supabase/services';
import { LoadingComponent, ErrorComponent, Heading } from '@/components';
import { useLanguage } from '@/contexts';
import { setFilterList } from '../slice';
import FilterManagementItem from './FilterManagementItem';

const FilterManagement = () => {

  const { language } = useLanguage();
  const dispatch = useAppDispatch();

  const cuisines = useAppSelector(state => state.filters.cuisineFilters)
  const types = useAppSelector(state => state.filters.typeFilters)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError(false);
    setLoading(true)
    const loadFilters = async () => {

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          fetchMainIngredients(language),
          fetchCuisines(language),
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
  }, [language]);

  const handleUpdate = () => {

  }
  const handleDelete = () => {
    
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className='px-5 w-full grid grid-cols-2 gap-2 mt-5 mb-10 justify-center'>
      <div className="w-full bg-amber-200">
        <div className="flex justify-center">
          <Heading title='Main Ingredients' headingType='sub-heading' />
        </div>
        {types.map(type => (
          <FilterManagementItem
            key={type.id}
            filter={type}
            onDelete={() => { }}
            onUpdate={() => { }}
          />
        ))}
      </div>
      <div className="w-full bg-amber-200">
        <div className="flex justify-center">
          <Heading title='Cuisines' headingType='sub-heading' />
        </div>
        {cuisines.map(cuisine => (
          <FilterManagementItem
            key={cuisine.id}
            filter={cuisine}
            onDelete={() => { }}
            onUpdate={() => { }}
          />
        ))}
      </div>
    </div>

  );
}

export default FilterManagement;