import { supabase } from "@/integrations/supabase/client"
import { DB_COLUMNS } from "@/shared"

export const deleteRecipe = async (recipeId: string) => {
  
  await supabase
    .from('recipes')
    .delete()
    .eq(DB_COLUMNS.RECIPES.ID, recipeId)
    .throwOnError()

}