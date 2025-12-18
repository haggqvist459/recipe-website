import { UpdateRecipeType } from "../../types";
import { supabase } from "../client";
import { DB_COLUMNS } from "../../constants";


export const updateRecipe = async (recipeId: string, recipeDraft: UpdateRecipeType) => {

  const updatedId = await supabase
    .from('recipes')
    .update(recipeDraft)
    .eq(DB_COLUMNS.RECIPES.ID, recipeId)
    .throwOnError()

  return updatedId
}