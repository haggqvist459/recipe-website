import { removeGroceryList } from '@/integrations/supabase/queries'

export const deleteGroceryList = async (uid: string) => {

  await removeGroceryList(uid)

}