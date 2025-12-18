import { supabase } from "../client"
import { DB_COLUMNS } from "../../constants"

export const deleteRecipeCuisines = async (recipeId: string, cuisineIds: string[]) => {
  await supabase
    .from('recipe_cuisines')
    .delete()
    .eq(DB_COLUMNS.RECIPE_CUISINES.RECIPE_ID, recipeId)
    .in(DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID, cuisineIds)
    .throwOnError()
}

export const deleteRecipeMainIngredients = async (recipeId: string, mainIngredientIds: string[]) => {
  await supabase
  .from('recipe_main_ingredients')
  .delete()
  .eq(DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.RECIPE_ID, recipeId)
  .in(DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID, mainIngredientIds)
  .throwOnError()
}