import { supabase } from "@/supabase/client"
import { FilterOptionType, TablesInsert, LanguageType } from "@/types"
import { DB_COLUMNS } from "@/utils"

export const insertMainIngredient = async (
  mainIngredient: TablesInsert<'main_ingredients'>,
  language: LanguageType
): Promise<FilterOptionType> => {
  const textColumn = `${language}_text`;
  
  const { data } = await supabase
    .from('main_ingredients')
    .insert(mainIngredient)
    .select<string, FilterOptionType>(`${DB_COLUMNS.MAIN_INGREDIENTS.ID}, text:${textColumn}`)
    .single()
    .throwOnError();
  
  return data
}

export const insertCuisine = async (
  cuisine: TablesInsert<'cuisines'>,
  language: LanguageType
): Promise<FilterOptionType> => {
  const textColumn = `${language}_text`;
  
  const { data } = await supabase
    .from('cuisines')
    .insert(cuisine)
    .select<string, FilterOptionType>(`${DB_COLUMNS.CUISINES.ID}, text:${textColumn}`)
    .single()
    .throwOnError();
  
  return data
}