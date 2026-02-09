import { insertCuisine, insertMainIngredient } from "@/supabase/queries"
import { FilterCategoryType, LanguageType, FilterOptionType } from "@/types"

export const insertFilterService = async (filterCategory: FilterCategoryType, filterText: string, language: LanguageType): Promise<FilterOptionType> => {
  try {
    const newFilterData = language === 'en'
      ? { en_text: filterText, sv_text: '-' }
      : { en_text: '-', sv_text: filterText };

    if (filterCategory === 'types') {
      return await insertMainIngredient(newFilterData);
    } else {
      return await insertCuisine(newFilterData);
    }
  } catch (error) {
    throw error;
  }
}

// TODO ADD TRANSLATED FILTER TEXTS  