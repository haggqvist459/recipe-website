import { FilterOptionType, RecipeType, SortingFilterKey, LanguageType } from '@/types';
import { selectFilteredRecipes } from '@/supabase/queries';
import { mapRecipesDbToUI } from './utils'

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

  try {
    const dbData = await selectFilteredRecipes({ typeIds, cuisineIds, sortingFilter, language });
    return mapRecipesDbToUI(dbData)
  } catch (error) {
    throw error
  }
}