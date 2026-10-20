import { supabase } from '@/integrations/supabase/client'
import { FilterOptionType } from '@/shared/types'


export const selectMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {    
    const { data } = await supabase
      .from('main_ingredients')
      .select<string, FilterOptionType>('*')
      .throwOnError()
    return data
  } catch (error) {
    throw error
  }
}

export const selectCuisines = async (): Promise<FilterOptionType[]> => {
  try {
    const { data } = await supabase
      .from("cuisines")
      .select<string, FilterOptionType>('*')
      .throwOnError()
    return data
  } catch (error) {
    throw error
  }
}