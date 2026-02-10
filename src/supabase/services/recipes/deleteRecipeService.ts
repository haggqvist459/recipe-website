import { deleteRecipe } from "@/supabase/queries"

export const deleteRecipeService = async (recipeId: string) => {

  try {
    await deleteRecipe(recipeId)
  } catch (error) {
    throw error
  }
}