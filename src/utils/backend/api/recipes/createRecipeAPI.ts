import { processRecipe } from "@/utils/backend/services/recipes/createRecipeService";
import type { RecipeDraftType } from "../../types";

export const createRecipe = async (draft: RecipeDraftType, uid: string): Promise<string> => {
  try {
    const data = await processRecipe(draft, uid);
    return data
  } catch (error) {
    throw error
  }
};