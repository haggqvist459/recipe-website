import { mapMultipleRecipesDbToUI } from './utils'
import { fetchRecipesWithRelationsFromDB } from '@/supabase/queries'
import { RecipeType, LanguageType } from '@/types'

export const fetchAllRecipes = async (language: LanguageType): Promise<RecipeType[]> => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB(language)
    return mapMultipleRecipesDbToUI(dbData)
  } catch (error) {
     throw error
  }
}