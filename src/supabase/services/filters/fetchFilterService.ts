import { selectMainIngredients, selectCuisines } from '@/supabase/queries';
import { FilterOptionType } from '@/types';

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await selectMainIngredients();
    return data;
  } catch (error) {
    throw error
  }
};

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await selectCuisines();
    return data;
  } catch (error) {
    throw error
  }
};