import { RecipeType, DbRecipeWithRelations, InstructionType, IngredientType } from '@/shared/types'

export const mapMultipleRecipesDbToUI = ( dbRecipes: DbRecipeWithRelations[] ): Record<string, RecipeType> => {
  return Object.fromEntries(
    dbRecipes.map((dbRecipe) => {
      const safeMainIngredients = Array.isArray(dbRecipe.recipe_main_ingredients)
        ? dbRecipe.recipe_main_ingredients
        : []

      const safeCuisines = Array.isArray(dbRecipe.recipe_cuisines)
        ? dbRecipe.recipe_cuisines
        : []

      const mappedMainIngredients = safeMainIngredients.map((relation) => ({
        id: relation.main_ingredients.id,
        en_text: relation.main_ingredients.en_text,
        sv_text: relation.main_ingredients.sv_text,
        categoryCounter: relation.main_ingredients.category_counter
      }))

      const mappedCuisines = safeCuisines.map((relation) => ({
        id: relation.cuisines.id,
        en_text: relation.cuisines.en_text,
        sv_text: relation.cuisines.sv_text,
        categoryCounter: relation.cuisines.category_counter
      }))

      const mappedInstructions: InstructionType[] = Array.isArray(
        dbRecipe.instructions
      )
        ? (dbRecipe.instructions as InstructionType[])
        : []

      const mappedIngredients: IngredientType[] = Array.isArray(
        dbRecipe.ingredients
      )
        ? (dbRecipe.ingredients as IngredientType[])
        : []

      const recipe: RecipeType = {
        id: dbRecipe.id,
        createdAt: dbRecipe.created_at,
        title: dbRecipe.title,
        description: dbRecipe.description,
        includeWeekly: dbRecipe.include_weekly,
        mainIngredients: mappedMainIngredients,
        cuisines: mappedCuisines,
        instructions: mappedInstructions,
        ingredients: mappedIngredients,
        servings: dbRecipe.servings
      }

      return [dbRecipe.id, recipe]
    })
  )
}

export const mapSingleRecipeDbToUI = (dbRecipe: DbRecipeWithRelations): RecipeType => {
  const safeMainIngredients = Array.isArray(dbRecipe.recipe_main_ingredients)
    ? dbRecipe.recipe_main_ingredients
    : [];
  const safeCuisines = Array.isArray(dbRecipe.recipe_cuisines)
    ? dbRecipe.recipe_cuisines
    : [];

  const mappedMainIngredients = safeMainIngredients.map((relation) => ({
    id: relation.main_ingredients.id,
    en_text: relation.main_ingredients.en_text,
    sv_text: relation.main_ingredients.sv_text,
    categoryCounter: relation.main_ingredients.category_counter
  }));

  const mappedCuisines = safeCuisines.map((relation) => ({
    id: relation.cuisines.id,
    en_text: relation.cuisines.en_text,
    sv_text: relation.cuisines.sv_text,
    categoryCounter: relation.cuisines.category_counter
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
    description: dbRecipe.description,
    includeWeekly: dbRecipe.include_weekly,
    mainIngredients: mappedMainIngredients,
    cuisines: mappedCuisines,
    instructions: mappedInstructions,
    ingredients: mappedIngredients,
    servings: dbRecipe.servings
  };
};