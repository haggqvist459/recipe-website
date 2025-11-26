import { RecipeType, DbRecipeWithRelations, InstructionType, IngredientType } from '../../types/index.ts'

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
      text: relation.main_ingredients.text,
    }))

    const mappedCuisines = safeCuisines.map((relation) => ({
      id: relation.cuisines.id,
      text: relation.cuisines.text,
    }))

    const mappedInstructions = Array.isArray(dbRecipe.instructions)
      ? (dbRecipe.instructions as InstructionType[])
      : []

    const mappedIngredients = Array.isArray(dbRecipe.ingredients)
      ? (dbRecipe.ingredients as IngredientType[])
      : []

    return {
      id: dbRecipe.id,
      createdAt: new Date(dbRecipe.created_at),
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
    text: relation.main_ingredients.text,
  }));

  const mappedCuisines = safeCuisines.map((relation) => ({
    id: relation.cuisines.id,
    text: relation.cuisines.text,
  }));

  const mappedInstructions = Array.isArray(dbRecipe.instructions)
    ? (dbRecipe.instructions as InstructionType[])
    : [];

  const mappedIngredients = Array.isArray(dbRecipe.ingredients)
    ? (dbRecipe.ingredients as IngredientType[])
    : [];

  return {
    id: dbRecipe.id,
    createdAt: new Date(dbRecipe.created_at),
    title: dbRecipe.title,
    description: dbRecipe.description ?? '',
    includeWeekly: dbRecipe.include_weekly,
    types: mappedTypes,
    cuisines: mappedCuisines,
    instructions: mappedInstructions,
    ingredients: mappedIngredients,
  };
};