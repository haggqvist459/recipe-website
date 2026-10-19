import { supabase } from '@/integrations/supabase/client'
import { DB_TABLES, DB_COLUMNS } from '@/shared/constants'

export const selectGroceryList = async (uid: string) => {

  const { data } = await supabase
    .from('grocery_lists')
    .select(`*, ${DB_TABLES.GROCERY_LIST_ITEMS}(*)`)
    .eq(DB_COLUMNS.GROCERY_LISTS.USER_ID, uid)
    .maybeSingle()
    .throwOnError()

    return data
}