import { mapRecipeDraftToDb } from "./utils"
import { RecipeDraftType } from '@/types'
import { selectUserRole, insertRecipe, insertRecipeMainIngredients, insertRecipeCuisines } from '@/supabase/queries'


export const processRecipe = async (draft: RecipeDraftType, uid: string): Promise<string> => {
    if (!draft.title.trim()) throw new Error("Recipe title is required.")
    if (
      draft.ingredients.length === 0 ||
      draft.ingredients.some((i) => !i.name.trim() || !i.amount.trim() || i.unit === "")
    ) {
      throw new Error("Each ingredient must have a name, amount, and unit.")
    }
    if (
      draft.instructions.length === 0 ||
      draft.instructions.some((i) => !i.title.trim() || !i.text.trim())
    ) {
      throw new Error("Each instruction must have a title and description.")
    }
    const dbRecipe = mapRecipeDraftToDb(draft)
    const userRole = await selectUserRole(uid)
    if (userRole.rank < 2) {
      throw new Error('You do not have permission to create a recipe. If this is wrong, contact the webmaster.')
    }
    const recipeId = await insertRecipe(dbRecipe)
    if (draft.types && draft.types.length > 0) {
      const typeIds = draft.types.map(type => type.id)
      await insertRecipeMainIngredients(recipeId, typeIds)
    }
    if (draft.cuisines && draft.cuisines.length > 0) {
      const cuisineIds = draft.cuisines.map(cuisine => cuisine.id)
      await insertRecipeCuisines(recipeId, cuisineIds)
    }

    return recipeId

}

