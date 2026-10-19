import { DB_COLUMNS } from '@/shared/constants'
import { supabase } from '@/integrations/supabase/client'

export const removeGroceryList = async (uid: string) => {
  await supabase
    .from('grocery_lists')
    .delete()
    .eq(DB_COLUMNS.GROCERY_LISTS.USER_ID, uid)
    .throwOnError()
}