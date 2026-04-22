import { insertRecipeCuisines, insertRecipeMainIngredients } from '@/supabase/queries'


export const attachRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
): Promise<void> => {

  if (!mainIngredientIds?.length) {
    throw new Error("attachRecipeMainIngredients called without any IDs")
  }

  await insertRecipeMainIngredients(recipeId, mainIngredientIds)

}

export const attachRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
): Promise<void> => {

  if (!cuisineIds?.length) {
    throw new Error("attachRecipeCuisines called without any IDs")
  }

  await insertRecipeCuisines(recipeId, cuisineIds)

};

//TODO Decide whether to translate those errors or not 
