import { saveGroceryListService } from "../../services/groceries"
import { ListItemData } from "../../types"

export const setGroceryListAPI = async (uid: string, list: ListItemData[]) => {
  await saveGroceryListService(uid, list);
}