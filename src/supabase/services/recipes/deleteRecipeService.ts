import { handleError } from "@/errorHandling"
import { deleteRecipe } from "@/supabase/queries"

export const deleteRecipeService = async (recipeId: string) => {

  try {
    await deleteRecipe(recipeId)
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}