import { SortingFilterKey, FilterOptionType, RecipeType, LanguageType } from "../../types/index.ts"
import { fetchFilteredRecipesService } from "../../services/recipes/fetchFilteredRecipesService"

export const fetchFilteredRecipesAPI = async (
  {
    typeFilters,
    cuisineFilters,
    sortingFilter,
    language
  }: {
    typeFilters?: FilterOptionType[]
    cuisineFilters?: FilterOptionType[]
    sortingFilter: SortingFilterKey
    language: LanguageType
  }
): Promise<RecipeType[]> => {
  try {
    const data = await fetchFilteredRecipesService({ typeFilters, cuisineFilters, sortingFilter, language })
    return data
  } catch (error) {
    throw error
  }
}