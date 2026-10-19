import { RecipeType, RecipeDraftType, TablesUpdate } from '@/types';

type RecipeDiff = {
  recipeUpdates: TablesUpdate<"recipes"> | null;
  cuisineChanges: { toDelete: string[], toInsert: string[] };
  mainIngredientChanges: { toDelete: string[], toInsert: string[] };
};

export const diffRecipes = (original: RecipeType, draft: RecipeDraftType): RecipeDiff => {
  const recipeUpdates: TablesUpdate<"recipes"> = {
    ...(draft.title !== original.title && { title: draft.title }),
    ...(draft.description !== original.description && { description: draft.description }),
    ...(draft.includeWeekly !== original.includeWeekly && { include_weekly: draft.includeWeekly }),
    ...(draft.servings !== original.servings && { servings: draft.servings }),
    ...(JSON.stringify(draft.ingredients) !== JSON.stringify(original.ingredients) && { ingredients: draft.ingredients }),
    ...(JSON.stringify(draft.instructions) !== JSON.stringify(original.instructions) && { instructions: draft.instructions })
  };

  const cuisineChanges = {
    toDelete: (original.cuisines ?? [])
      .filter(originalCuisine => !(draft.cuisines ?? []).some(draftCuisine => draftCuisine.id === originalCuisine.id))
      .map(cuisine => cuisine.id),
    toInsert: (draft.cuisines ?? [])
      .filter(draftCuisine => !(original.cuisines ?? []).some(originalCuisine => originalCuisine.id === draftCuisine.id))
      .map(cuisine => cuisine.id)
  };

  const mainIngredientChanges = {
    toDelete: (original.types ?? [])
      .filter(originalIngredient => !(draft.types ?? []).some(draftIngredient => draftIngredient.id === originalIngredient.id))
      .map(ingredient => ingredient.id),
    toInsert: (draft.types ?? [])
      .filter(draftIngredient => !(original.types ?? []).some(originalIngredient => originalIngredient.id === draftIngredient.id))
      .map(ingredient => ingredient.id)
  };

  return {
    recipeUpdates: Object.keys(recipeUpdates).length > 0 ? recipeUpdates : null,
    cuisineChanges,
    mainIngredientChanges
  };
  
};