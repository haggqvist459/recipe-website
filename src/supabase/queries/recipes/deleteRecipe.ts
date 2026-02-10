import { supabase } from "@/supabase/client"
import { DB_COLUMNS } from "@/utils"

export const deleteRecipe = async (recipeId: string) => {
  
  await supabase
    .from('recipes')
    .delete()
    .eq(DB_COLUMNS.RECIPES.ID, recipeId)
    .throwOnError()

}