import { removeGroceryList } from "../../db/groceries"

export const removeGroceryListService = async (uid: string) => {
  try {
    await removeGroceryList(uid)
  } catch (error) {
    throw error
  }
}