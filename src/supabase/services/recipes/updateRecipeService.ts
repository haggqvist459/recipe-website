import { selectSingleRecipe, updateRecipe, deleteRecipeCuisines, deleteRecipeMainIngredients, insertRecipeCuisines, insertRecipeMainIngredients, selectUserRole } from '@/supabase/queries'
import { LanguageType, RecipeDraftType } from '@/types'
import { mapSingleRecipeDbToUI, diffRecipes } from './utils'



export const processRecipeUpdate = async (uid: string, recipeId: string, recipeDraft: RecipeDraftType, language: LanguageType) => {
  
    const userRole = await selectUserRole(uid);
    if (userRole.rank != 3) {
      throw new Error('You do not have permission to edit a recipe. If this is wrong, contact the webmaster. ')
    }
    const originalRecipeDb = await selectSingleRecipe(recipeId, language)
    const mappedOriginalRecipe = mapSingleRecipeDbToUI(originalRecipeDb)

    const recipeDiffs = diffRecipes(mappedOriginalRecipe, recipeDraft)
    let updatedId

    if (recipeDiffs.recipeUpdates) {
      updatedId = await updateRecipe(recipeId, recipeDiffs.recipeUpdates)
    }

    if (recipeDiffs.cuisineChanges.toDelete.length > 0) {
      await deleteRecipeCuisines(recipeId, recipeDiffs.cuisineChanges.toDelete)
    }

    if (recipeDiffs.cuisineChanges.toInsert.length > 0) {
      await insertRecipeCuisines(recipeId, recipeDiffs.cuisineChanges.toInsert)
    }

    if (recipeDiffs.mainIngredientChanges.toDelete.length > 0) {
      await deleteRecipeMainIngredients(recipeId, recipeDiffs.mainIngredientChanges.toDelete)
    }

    if (recipeDiffs.mainIngredientChanges.toInsert.length > 0) {
      await insertRecipeMainIngredients(recipeId, recipeDiffs.mainIngredientChanges.toInsert)
    }

    return updatedId

}
