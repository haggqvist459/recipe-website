import { selectSingleRecipe } from '@/supabase/queries';
import { mapRecipeDbToUI } from "./utils";
import { LanguageType, RecipeType } from '@/types';


export const fetchSingleRecipe = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const dbData = await selectSingleRecipe(id, language)
    return mapRecipeDbToUI(dbData)
  } catch (error) {
    throw error
  }
  
}