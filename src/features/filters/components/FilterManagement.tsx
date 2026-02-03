import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchCuisines, fetchMainIngredients } from '@/supabase/services';
import { LoadingComponent, ErrorComponent } from '@/components';
import { useLanguage } from '@/contexts';
import { setFilterList } from '../slice';

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

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <div>FilterManagement</div>
  );
}

export default FilterManagement;