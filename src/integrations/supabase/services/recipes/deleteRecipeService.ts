import { deleteRecipe } from "@/integrations/supabase/queries"

export const deleteRecipeService = async (recipeId: string) => {
  await deleteRecipe(recipeId)
}