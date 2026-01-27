import type { TablesInsert, Tables } from "@/types/database.schema";
import { TablesUpdate } from "./database.schema";

export type InsertRecipeType = TablesInsert<"recipes">;
export type InsertRecipeCuisine = TablesInsert<"recipe_cuisines">;
export type InsertRecipeMainIngredient = TablesInsert<"recipe_main_ingredients">;

export type UpdateRecipeType = TablesUpdate<'recipes'>
export type UpdateRecipeCuisine = TablesUpdate<'cuisines'>
export type UpdateRecipeMainIngredient = TablesUpdate<'main_ingredients'>

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