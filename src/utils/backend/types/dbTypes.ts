import type { TablesInsert, Tables } from "@/types/database.types";

export type InsertRecipeType = TablesInsert<"recipes">;
export type InsertRecipeCuisine = TablesInsert<"recipe_cuisines">;
export type InsertRecipeMainIngredient = TablesInsert<"recipe_main_ingredients">;

export type DbRecipeWithRelations = Tables<'recipes'> & {
  recipe_cuisines: {
    cuisines: {
      id: string,
      text: string
    }
  }[]
  recipe_main_ingredients: {
    main_ingredients: {
      id: string,
      text: string
    }
  }[]
}

export type UserRoleType = {
  role: 'admin' | 'user' | 'webmaster',
  rank: number
}