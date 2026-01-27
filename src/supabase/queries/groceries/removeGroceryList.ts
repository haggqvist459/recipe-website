import { DB_COLUMNS } from '@/utils/constants'
import { supabase } from '@/supabase/client'

export const removeGroceryList = async (uid: string) => {
  await supabase
    .from('grocery_lists')
    .delete()
    .eq(DB_COLUMNS.GROCERY_LISTS.USER_ID, uid)
    .throwOnError()
}