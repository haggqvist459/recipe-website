import { handleError } from "@/errorHandling"
import { updateCuisine, updateMainIngredient } from "@/integrations/supabase/queries"
import { FilterCategoryType, LanguageType } from "@/shared/types"

export const updateFilterService = async (updatedText: string, filterCategory: FilterCategoryType, filterId: string, language: LanguageType) => {
  
  try {
    if (filterCategory === 'mainIngredients') {
      await updateMainIngredient(filterId, updatedText, language)
    } else if (filterCategory === 'cuisines') {
      await updateCuisine(filterId, updatedText, language)
    } else { 
      throw new Error('The filter category is wrong, can not update the filter.')
    }
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}