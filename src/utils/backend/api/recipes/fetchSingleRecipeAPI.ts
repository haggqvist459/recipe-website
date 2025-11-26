import { fetchSingleRecipeService } from "../../services";
import { LanguageType, RecipeType } from "../../types/index.ts";

export const fetchSingleRecipeAPI = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const recipe = await fetchSingleRecipeService(id, language)
    return recipe
  } catch (error) {
    throw error
  }

}