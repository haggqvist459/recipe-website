import { insertCuisine, insertMainIngredient } from "@/supabase/queries"
import { FilterCategoryType, LanguageType } from "@/types"

export const insertFilterService = async (filterCategory: FilterCategoryType, filterText: string, language: LanguageType) => {
  
  try {
    if (filterCategory === 'types'){
      const newFilter = await insertMainIngredient()
    }
  } catch (error) {
    throw error
  }
}

// TODO ADD TRANSLATION TEXT 