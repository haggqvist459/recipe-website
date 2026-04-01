import { removeGroceryList } from '@/supabase/queries'

export const deleteGroceryList = async (uid: string) => {

  await removeGroceryList(uid)

}