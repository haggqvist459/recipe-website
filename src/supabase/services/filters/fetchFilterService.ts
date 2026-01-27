import { selectMainIngredients, selectCuisines } from '@/supabase/queries';
import { FilterOptionType, LanguageType } from '@/types';

export const fetchMainIngredients = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await selectMainIngredients(language);
    return data;
  } catch (error) {
    throw error
  }
};

export const fetchCuisines = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await selectCuisines(language);
    return data;
  } catch (error) {
    throw error
  }
};