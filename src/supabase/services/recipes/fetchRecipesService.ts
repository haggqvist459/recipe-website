import { mapRecipesDbToUI } from './utils'
import { fetchRecipesWithRelationsFromDB } from '@/supabase/queries'
import { RecipeType, LanguageType } from '@/types'

export const fetchAllRecipes = async (language: LanguageType): Promise<RecipeType[]> => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB(language)
    return mapRecipesDbToUI(dbData)
  } catch (error) {
     throw error
  }
}