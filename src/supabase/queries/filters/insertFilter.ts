import { supabase } from "@/supabase/client"
import { FilterOptionType, TablesInsert } from "@/types"

export const insertMainIngredient = async (
  mainIngredient: TablesInsert<'main_ingredients'>,
): Promise<FilterOptionType> => {
  
  const { data } = await supabase
    .from('main_ingredients')
    .insert(mainIngredient)
    .select<string, FilterOptionType>(`*`)
    .single()
    .throwOnError();
  
  return data
}

export const insertCuisine = async (
  cuisine: TablesInsert<'cuisines'>,
): Promise<FilterOptionType> => {
  
  const { data } = await supabase
    .from('cuisines')
    .insert(cuisine)
    .select<string, FilterOptionType>(`*`)
    .single()
    .throwOnError();
  
  return data
}
