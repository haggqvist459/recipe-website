import { insertRecipe } from "@/utils/backend/db";
import { mapRecipeDraftToDb } from "./utils";
import { RecipeDraftType } from "../../types/index.ts";
import { attachRecipeCuisines, attachRecipeMainIngredients } from "../filters";
import { selectUserRole } from "../../db/auth/getUserRole";


export const processRecipe = async (draft: RecipeDraftType, uid: string): Promise<string> => {
  if (!draft.title.trim()) throw new Error("Recipe title is required.");
  if (
    draft.ingredients.length === 0 ||
    draft.ingredients.some((i) => !i.name.trim() || !i.amount.trim() || i.unit === "")
  ) {
    throw new Error("Each ingredient must have a name, amount, and unit.");
  }
  if (
    draft.instructions.length === 0 ||
    draft.instructions.some((i) => !i.title.trim() || !i.text.trim())
  ) {
    throw new Error("Each instruction must have a title and description.");
  }

  try {
    const dbRecipe = mapRecipeDraftToDb(draft);
    const userRole = await selectUserRole(uid);
    if (userRole.rank < 2){
      throw new Error('[processRecipe] - Error creating recipe, insufficient permissions.')
    }
      const recipeId = await insertRecipe(dbRecipe);
    if (draft.types && draft.types.length > 0) {
      const typeIds = draft.types.map(type => type.id);
      await attachRecipeMainIngredients(recipeId, typeIds)
    }
    if (draft.cuisines && draft.cuisines.length > 0) {
      const cuisineIds = draft.cuisines.map(cuisine => cuisine.id)
      await attachRecipeCuisines(recipeId, cuisineIds)
    }

    return recipeId;
  } catch (error) {
    throw error
  }
};