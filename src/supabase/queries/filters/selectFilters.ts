import { supabase } from '@/supabase/client';
import { FilterOptionType } from '@/types';


export const selectMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {    
    const { data } = await supabase
      .from('main_ingredients')
      .select<string, FilterOptionType>('*')
      .throwOnError();
    return data
  } catch (error) {
    throw error
  }
};

export const selectCuisines = async (): Promise<FilterOptionType[]> => {
  try {
    const { data } = await supabase
      .from("cuisines")
      .select<string, FilterOptionType>('*')
      .throwOnError()
    return data;
  } catch (error) {
    throw error
  }
};