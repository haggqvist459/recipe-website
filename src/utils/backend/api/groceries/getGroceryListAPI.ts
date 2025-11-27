import { fetchGroceryListService } from "../../services/groceries"
import { GroceryListType } from "../../types"

export const getGroceryListAPI = async (uid: string): Promise<GroceryListType | null> => {
  const data = await fetchGroceryListService(uid)
  return data
}