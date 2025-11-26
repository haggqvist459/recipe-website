import { mapRecipesDbToUI } from './mapRecipeUI'
import { fetchRecipesWithRelationsFromDB } from '../../db'
import { RecipeType, LanguageType } from '../../types/index.ts'

export const fetchRecipesService = async (language: LanguageType): Promise<RecipeType[]> => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB(language)
    return mapRecipesDbToUI(dbData)
  } catch (error) {
     throw error
  }
}