import { updateCuisine, updateMainIngredient } from "@/supabase/queries"
import { FilterCategoryType, LanguageType } from "@/types"

export const updateFilterService = async (updatedText: string, filterCategory: FilterCategoryType, filterId: string, language: LanguageType) => {
  
  try {
    if (filterCategory === 'types') {
      await updateMainIngredient(filterId, updatedText, language)
    } else if (filterCategory === 'cuisines') {
      await updateCuisine(filterId, updatedText, language)
    } else { 
      throw new Error('updateFilterService error: Incorrect filter category.')
    }
  } catch (error) {
    throw error
  }
}