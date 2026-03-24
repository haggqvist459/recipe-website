import { handleError } from '@/errorHandling';
import { insertRecipeCuisines, insertRecipeMainIngredients } from '@/supabase/queries'


export const attachRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
): Promise<void> => {
  try {
    if (!mainIngredientIds?.length) {
      throw new Error("attachRecipeMainIngredients called without any IDs")
    }

    await insertRecipeMainIngredients(recipeId, mainIngredientIds)
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
};

export const attachRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
): Promise<void> => {
  try {
    if (!cuisineIds?.length) {
      throw new Error("attachRecipeCuisines called without any IDs")
    }

    await insertRecipeCuisines(recipeId, cuisineIds)
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
};