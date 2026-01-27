import { removeGroceryList } from '@/supabase/queries';

export const deleteGroceryList = async (uid: string) => {
  try {
    await removeGroceryList(uid)
  } catch (error) {
    throw error
  }
}