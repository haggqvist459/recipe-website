import { FilterOptionType, RecipeType, SortingFilterKey, LanguageType } from '@/types';
import { selectFilteredRecipes } from '@/supabase/queries';
import { mapMultipleRecipesDbToUI } from './utils'

export const fetchFilteredRecipes = async ({
  typeFilters,
  cuisineFilters,
  sortingFilter,
  language
}: {
  typeFilters?: FilterOptionType[]
  cuisineFilters?: FilterOptionType[]
  sortingFilter: SortingFilterKey
  language: LanguageType
}): Promise<RecipeType[]> => {

  const typeIds = typeFilters?.map((type) => type.id);
  const cuisineIds = cuisineFilters?.map((cuisine) => cuisine.id);

  const dbData = await selectFilteredRecipes({ typeIds, cuisineIds, sortingFilter, language });
  return mapMultipleRecipesDbToUI(dbData)

}