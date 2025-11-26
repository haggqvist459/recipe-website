import { supabase } from "../client";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { InsertRecipeType } from "../../types/index.ts";

export const insertRecipe = async (recipe: InsertRecipeType): Promise<string> => {

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    const { data } = await supabase
      .from(DB_TABLES.RECIPES)
      .insert([recipe])
      .select(DB_COLUMNS.RECIPES.ID)
      .single()
      .throwOnError();

    return data.id

  } catch (error) {
    throw error
  }


};