import { deleteRecipe } from "@/supabase/queries"

export const deleteRecipeService = async (recipeId: string) => {
  await deleteRecipe(recipeId)
}