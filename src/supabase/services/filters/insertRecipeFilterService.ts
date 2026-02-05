import { insertRecipeCuisines, insertRecipeMainIngredients } from '@/supabase/queries';


export const attachRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
): Promise<void> => {

  if (!mainIngredientIds?.length) {
    throw new Error("attachRecipeMainIngredients called without any IDs");
  }

  try {
    await insertRecipeMainIngredients(recipeId, mainIngredientIds);
  } catch (error) {
    throw error
  }
};

export const attachRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
): Promise<void> => {
  if (!cuisineIds?.length) {
    throw new Error("attachRecipeCuisines called without any IDs");
  }

  try {
    await insertRecipeCuisines(recipeId, cuisineIds);
  } catch (error) {
    throw error
  }
};