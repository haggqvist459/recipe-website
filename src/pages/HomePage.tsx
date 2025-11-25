import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux';
import { getCuisines, getMainIngredients } from '@/utils/backend/api/filters';
import { PageContainer, Heading, LoadingComponent, ErrorComponent } from "@/components";
import { RecipeList } from "@/features/recipeList";
import { setFilterList, setActiveFilter, setActiveSorting, Filters, type SortingFilterKey } from '@/features/filters';
import { FilterOptionType } from '@/types';
import { useLanguage, } from '@/contexts';
import { translateText } from '@/utils';



const HomePage = () => {

  const { language } = useLanguage()
  const dispatch = useAppDispatch();
  const typeFilters = useAppSelector(state => state.filters.typeFilters);
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters);
  const selectedTypeFilters = useAppSelector(state => state.filters.selectedTypeFilters);
  const selectedCuisineFilters = useAppSelector(state => state.filters.selectedCuisineFilters);
  const selectedSortingFilter = useAppSelector(state => state.filters.selectedSortingFilter);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setError(false);

    const loadFilters = async () => {

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          getMainIngredients(language),
          getCuisines(language),
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
        setError(false)
      }
    };

    loadFilters();
  }, [language]);

  const handleToggleFilter = (filterCategory: "types" | "cuisines", filter: FilterOptionType) => {
    dispatch(setActiveFilter({ filterCategory, filter }));
  };

  const handleSetSorting = (sorting: SortingFilterKey) => {
    dispatch(setActiveSorting(sorting));
  };

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <PageContainer>
      <Filters
        typeFilters={typeFilters}
        cuisineFilters={cuisineFilters}
        selectedTypeFilters={selectedTypeFilters}
        selectedCuisineFilters={selectedCuisineFilters}
        selectedSortingFilter={selectedSortingFilter}
        onToggleFilter={handleToggleFilter}
        onSetSorting={handleSetSorting}
      />
      <div className="my-3 px-3">
        <Heading title={translateText('homePage', 'recipe', language)} />
        <RecipeList />
      </div>
    </PageContainer>
  );

}

export default HomePage;