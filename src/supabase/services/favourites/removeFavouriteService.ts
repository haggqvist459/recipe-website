import { handleError } from '@/errorHandling';
import { deleteFavourite } from '@/supabase/queries';

export const removeFavourite = async (uid: string, recipeId: string): Promise<void> => {
  try {
    await deleteFavourite(uid, recipeId);
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }

}