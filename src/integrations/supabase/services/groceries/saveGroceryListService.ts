import { insertGroceryList, insertGroceryListItems } from '@/integrations/supabase/queries'
import { ListItemData } from '@/shared/types'

export const saveGroceryList = async (uid: string, list: ListItemData[]) => {

    // Step 1: Create parent record in grocery_lists
    const parentRecord = await insertGroceryList(uid)
    if (!parentRecord?.id) {
      throw new Error('Failed to create grocery list')
    }

    // Step 2: Only if parent insert succeeds, insert all items
    await insertGroceryListItems(uid, parentRecord.id, list)


}