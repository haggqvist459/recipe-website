import { supabase } from "@/utils/backend/db/client";
import { DB_TABLES } from "@/utils/backend/constants";
import { InsertRecipeCuisine, InsertRecipeMainIngredient } from "../../types";

export const insertRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
): Promise<void> => {

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    if (!mainIngredientIds || mainIngredientIds.length === 0) {
      throw new Error('No mainIngredientIds provided for insertRecipeMainIngredients');
    }

    const rows: InsertRecipeMainIngredient[] = mainIngredientIds.map((id) => ({
      recipe_id: recipeId,
      main_ingredient_id: id,
    }));

    await supabase.from(DB_TABLES.RECIPE_MAIN_INGREDIENTS).insert(rows).throwOnError();
  } catch (error) {
    throw error
  }
};


export const insertRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
): Promise<void> => {

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    if (!cuisineIds || cuisineIds.length === 0) {
      throw new Error('No mainIngredientIds provided for insertRecipeMainIngredients');
    }

    const rows: InsertRecipeCuisine[] = cuisineIds.map((id) => ({
      recipe_id: recipeId,
      cuisine_id: id,
    }));

    await supabase.from(DB_TABLES.RECIPE_CUISINES).insert(rows).throwOnError();
  } catch (error) {
    throw error
  }
};