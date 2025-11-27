import { supabase } from "../client"
import { ListItemData } from "../../types"
import { DB_TABLES, DB_COLUMNS } from "../../constants"

export const insertGroceryList = async (uid: string) => {
  const { data } = await supabase
    .from(DB_TABLES.GROCERY_LIST)
    .insert({
      [DB_COLUMNS.GROCERY_LISTS.USER_ID]: uid
    })
    .select('id')
    .single()
    .throwOnError()

  return data
}

export const insertGroceryListItems = async (uid: string, listId: string, list: ListItemData[]) => {
  const { data } = await supabase
    .from(DB_TABLES.GROCERY_LIST_ITEMS)
    .insert(
      list.map(item => ({
        [DB_COLUMNS.GROCERY_LIST_ITEMS.ID]: item.id,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.LIST_ID]: listId,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.USER_ID]: uid,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.TEXT]: item.text,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.AMOUNT]: item.amount || null,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.UNIT]: item.unit || null,
        [DB_COLUMNS.GROCERY_LIST_ITEMS.COMPLETED]: item.completed
      }))
    )
    .throwOnError()

  return data
}
