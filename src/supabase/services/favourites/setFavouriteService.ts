import { insertFavourite } from '@/supabase/queries';
import type { FavouriteType } from "@/types";

export const setFavourite = async (uid: string, recipeId: string): Promise<FavouriteType> => {

  try {
    const dbData = await insertFavourite(uid, recipeId);
    const formattedData: FavouriteType = {
      userId: dbData.user_id,
      recipeId: dbData.recipe_id,
      createdAt: dbData.created_at,
      title: dbData.recipes.title
    } 
    return formattedData
  } catch (error) {
    throw error
  }

}