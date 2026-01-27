import { selectSingleRecipe, updateRecipe, deleteRecipeCuisines, deleteRecipeMainIngredients, insertRecipeCuisines, insertRecipeMainIngredients, selectUserRole} from '@/supabase/queries';
import { LanguageType, RecipeDraftType } from '@/types';
import { mapRecipeDbToUI, diffRecipes } from './utils';


export const processRecipeUpdate = async (uid: string, recipeId: string, recipeDraft: RecipeDraftType, language: LanguageType) => {
  try {
    const userRole = await selectUserRole(uid);
    if (userRole.rank != 3) {
      throw new Error('[updateRecipe] - Error updating recipe, insufficient permissions')
    }
    const originalRecipeDb = await selectSingleRecipe(recipeId, language)
    const mappedOriginalRecipe = mapRecipeDbToUI(originalRecipeDb)

    const recipeDiffs = diffRecipes(mappedOriginalRecipe, recipeDraft)

    if (recipeDiffs.recipeUpdates) {
     const updatedId = await updateRecipe(recipeId, recipeDiffs.recipeUpdates)
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

  } catch (error) {
    throw error
  }
}
