import { removeGroceryListService } from "../../services/groceries"

export const deleteGroceryListAPI = async (uid: string) => {
 await removeGroceryListService(uid) 
}