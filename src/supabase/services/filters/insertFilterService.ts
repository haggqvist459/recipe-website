import { handleError } from "@/errorHandling"
import { insertCuisine, insertMainIngredient } from "@/supabase/queries"
import { FilterCategoryType, LanguageType, FilterOptionType } from "@/types"

export const insertFilterService = async (filterCategory: FilterCategoryType, filterText: string, language: LanguageType): Promise<FilterOptionType> => {
  try {
    const newFilterData = language === 'en'
      ? { en_text: filterText, sv_text: '-' }
      : { en_text: '-', sv_text: filterText }

    if (filterCategory === 'types') {
      return await insertMainIngredient(newFilterData)
    } else if (filterCategory === 'cuisines') {
      return await insertCuisine(newFilterData)
    } else {
      throw new Error('There is a problem with the filter category provided with the new filter.')
    }
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}

// TODO ADD TRANSLATED FILTER TEXTS  