import { supabase } from "@/utils/backend/db/client";
import { FilterOptionType, LanguageType } from "../../types/";
import { DB_COLUMNS } from "@/utils/backend/constants";

export const selectMainIngredients = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {    
    const selectedColumns = `${DB_COLUMNS.MAIN_INGREDIENTS.ID}, text:${language}_text`
    const { data } = await supabase
      .from('main_ingredients')
      .select<string, FilterOptionType>(selectedColumns)
      .throwOnError();
    return data
  } catch (error) {
    throw error
  }
};

export const selectCuisines = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const selectedColumns = `${DB_COLUMNS.CUISINES.ID}, text:${language}_text`
    const { data } = await supabase
      .from("cuisines")
      .select<string, FilterOptionType>(selectedColumns)
      .throwOnError()
    return data;
  } catch (error) {
    throw error
  }
};