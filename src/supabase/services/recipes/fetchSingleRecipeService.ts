import { selectSingleRecipe } from '@/supabase/queries';
import { mapSingleRecipeDbToUI } from "./utils";
import { LanguageType, RecipeType } from '@/types';
import { handleError } from '@/errorHandling';


export const fetchSingleRecipe = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const dbData = await selectSingleRecipe(id, language)
    return mapSingleRecipeDbToUI(dbData)
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
  
}