import { getCuisinesService, getMainIngredientsService } from "@/utils/backend/services/";
import { FilterOptionType, LanguageType } from "../../types/index.ts";


export const getMainIngredients = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await getMainIngredientsService(language);
    return data
  } catch (error) {
    throw error
  }
};

export const getCuisines = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await getCuisinesService(language);
    return data
  } catch (error) {
   throw error
  }
};