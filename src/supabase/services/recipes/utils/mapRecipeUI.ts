import { RecipeType, DbRecipeWithRelations, InstructionType, IngredientType } from '@/types'

export const mapRecipesDbToUI = (dbRecipes: DbRecipeWithRelations[]): RecipeType[] => {
  return dbRecipes.map((dbRecipe) => {
    const safeMainIngredients = Array.isArray(dbRecipe.recipe_main_ingredients)
      ? dbRecipe.recipe_main_ingredients
      : []
    const safeCuisines = Array.isArray(dbRecipe.recipe_cuisines)
      ? dbRecipe.recipe_cuisines
      : []

    const mappedTypes = safeMainIngredients.map((relation) => ({
      id: relation.main_ingredients.id,
      en_text: relation.main_ingredients.en_text,
      sv_text: relation.main_ingredients.sv_text,
    }))

    const mappedCuisines = safeCuisines.map((relation) => ({
      id: relation.cuisines.id,
      en_text: relation.cuisines.en_text,
      sv_text: relation.cuisines.sv_text,
    }))

    const mappedInstructions = Array.isArray(dbRecipe.instructions)
      ? (dbRecipe.instructions as InstructionType[])
      : []

    const mappedIngredients = Array.isArray(dbRecipe.ingredients)
      ? (dbRecipe.ingredients as IngredientType[])
      : []

    return {
      id: dbRecipe.id,
      createdAt: dbRecipe.created_at,
      title: dbRecipe.title,
      description: dbRecipe.description ?? '',
      includeWeekly: dbRecipe.include_weekly,
      types: mappedTypes,
      cuisines: mappedCuisines,
      instructions: mappedInstructions,
      ingredients: mappedIngredients,
    }
  })
}

export const mapRecipeDbToUI = (dbRecipe: DbRecipeWithRelations): RecipeType => {
  const safeMainIngredients = Array.isArray(dbRecipe.recipe_main_ingredients)
    ? dbRecipe.recipe_main_ingredients
    : [];
  const safeCuisines = Array.isArray(dbRecipe.recipe_cuisines)
    ? dbRecipe.recipe_cuisines
    : [];

    const mappedTypes = safeMainIngredients.map((relation) => ({
    id: relation.main_ingredients.id,
    en_text: relation.main_ingredients.en_text,
    sv_text: relation.main_ingredients.sv_text,
  }));

    const mappedCuisines = safeCuisines.map((relation) => ({
    id: relation.cuisines.id,
    en_text: relation.cuisines.en_text,
    sv_text: relation.cuisines.sv_text,
  }));

  const mappedInstructions = Array.isArray(dbRecipe.instructions)
    ? (dbRecipe.instructions as InstructionType[])
    : [];

  const mappedIngredients = Array.isArray(dbRecipe.ingredients)
    ? (dbRecipe.ingredients as IngredientType[])
    : [];

  return {
    id: dbRecipe.id,
    createdAt: dbRecipe.created_at,
    title: dbRecipe.title,
    description: dbRecipe.description ?? '',
    includeWeekly: dbRecipe.include_weekly,
    types: mappedTypes,
    cuisines: mappedCuisines,
    instructions: mappedInstructions,
    ingredients: mappedIngredients,
  };
};