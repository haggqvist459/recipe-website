import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';


const selectRecipes = (state: RootState) => state.recipeList.recipes;
const selectSelectedTypeFilters = (state: RootState) => state.filters.selectedTypeFilters;
const selectSelectedCuisineFilters = (state: RootState) => state.filters.selectedCuisineFilters;
const selectSelectedSortingFilter = (state: RootState) => state.filters.selectedSortingFilter;


export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectSelectedTypeFilters, selectSelectedCuisineFilters, selectSelectedSortingFilter],
  (recipes, typeFilters, cuisineFilters, sortingFilter) => {
    let filtered = recipes;


    if (typeFilters.length > 0) {
      filtered = filtered.filter(recipe =>
        recipe.types?.some(recipeType =>
          typeFilters.some(filter => filter.id === recipeType.id)
        )
      );
    }

    if (cuisineFilters.length > 0) {
      filtered = filtered.filter(recipe =>
        recipe.cuisines?.some(recipeCuisine =>
          cuisineFilters.some(filter => filter.id === recipeCuisine.id)
        )
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortingFilter) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'a_z':
          return a.title.localeCompare(b.title);
        case 'z_a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }
);