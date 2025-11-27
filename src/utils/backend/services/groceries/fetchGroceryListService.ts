import { selectGroceryList } from "../../db/groceries"
import { GroceryListType, Unit } from "../../types"

export const fetchGroceryListService = async (uid: string): Promise<GroceryListType | null> => {

  try {
    const dbData = await selectGroceryList(uid)
    if (dbData) {
      const formattedData: GroceryListType = {
        id: dbData.id,
        createdAt: dbData.created_at,
        updatedAt: dbData.updated_at,
        userId: dbData.user_id,
        listItems: dbData.grocery_list_items.map(item => ({
          id: item.id,
          text: item.text,
          amount: item.amount || undefined,
          unit: (item.unit as Unit | '') || '',
          completed: item.completed || false
        }))
      }
      return formattedData
    } else {
      return null
    }

  } catch (error) {
    throw error
  }
} 