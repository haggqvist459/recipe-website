import { insertGroceryList, insertGroceryListItems } from "../../db/groceries"
import { ListItemData } from "../../types"

export const saveGroceryListService = async (uid: string, list: ListItemData[]) => {
  try {
    // Step 1: Create parent record in grocery_lists
    const parentRecord = await insertGroceryList(uid)
    if (!parentRecord?.id) {
      throw new Error('Failed to create grocery list')
    }

    // Step 2: Only if parent insert succeeds, insert all items
    await insertGroceryListItems(uid, parentRecord.id, list)

  } catch (error) {
    throw error
  }
}