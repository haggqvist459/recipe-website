import { selectSingleRecipe } from "../../db";
import { mapRecipeDbToUI } from "./utils";
import { LanguageType, RecipeType } from "../../types/index.ts";


export const fetchSingleRecipeService = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const dbData = await selectSingleRecipe(id, language)
    return mapRecipeDbToUI(dbData)
  } catch (error) {
    throw error
  }
  
}