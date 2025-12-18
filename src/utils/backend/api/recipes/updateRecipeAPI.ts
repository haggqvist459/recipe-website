import { processRecipeUpdate } from "../../services";
import { LanguageType, RecipeDraftType } from "../../types";

export const updateRecipeAPI = async (uid: string, recipeId: string, recipeDraft: RecipeDraftType, language: LanguageType) => {
  const data = await processRecipeUpdate(uid, recipeId, recipeDraft, language)
  
}