import { handleError } from '@/errorHandling';
import { removeGroceryList } from '@/supabase/queries';

export const deleteGroceryList = async (uid: string) => {
  try {
    await removeGroceryList(uid)
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}