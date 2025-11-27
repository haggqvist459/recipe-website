import { useLanguage, useAuth } from "@/contexts";
import { useAppSelector, useAppDispatch } from "@/redux";
import { translateText } from "@/utils";
import { getGroceryListAPI, setGroceryListAPI, deleteGroceryListAPI } from "@/utils/backend/api/groceries";
import { loadListFromDB, resetState, } from "@/features/groceryList";
import { CloudArrowDown, CloudArrowUp, Trashcan } from "@/components";



const GroceryListSettings = () => {

  const { language } = useLanguage()
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const groceryState = useAppSelector(state => state.groceryList)

  const handleSaveList = async () => {
    try {
      if (user) {
        await setGroceryListAPI(user.id, groceryState.items)
        // add successmessage to toast confirming action 
      }
    } catch (error) {
      throw error // implement proper error handling with error component
    }
  }

  const handleLoadList = async () => {
    try {
      if (user) {
        const dbList = await getGroceryListAPI(user.id)
        console.log("handleLoadList dbList: ", dbList)
        console.log("handleLoadList dbList.updatedAt: ", dbList?.updatedAt)
        console.log('handleLoadList groceryState.lastModified', groceryState.lastModified)
        if (!dbList) return // when toast exist, display 'no list in database or some such' 
        if (dbList.updatedAt > groceryState.lastModified) {
          console.log('handleLoadList dbList.updateAt true ')
          dispatch(loadListFromDB(dbList.listItems))
        }
      }

    } catch (error) {
      throw error // implement proper error handling with error component
    }
  }

  const handleDeleteList = async () => {
    try {
      if (user) {
        await deleteGroceryListAPI(user.id)
        dispatch(resetState())
        // add successmessage to toast confirming action 
      }
    } catch (error) {
      throw error // implement proper error handling with error component
    }
  }

  return (
    <div className="w-36">
      <button
        className="w-full flex justify-between px-2 py-1 border-b-[1px] button-click"
        onClick={() => handleSaveList()}
      >
        <span className="font-light">{translateText('grocerySettings', 'save', language)}</span>
        <CloudArrowUp />
      </button>
      <button
        className="w-full flex justify-between px-2 py-1 border-b-[1px] button-click"
        onClick={() => handleLoadList()}
      >
        <span className="font-light">{translateText('grocerySettings', 'load', language)}</span>
        <CloudArrowDown />
      </button>
      <button
        className="w-full flex justify-between px-2 py-1 border-b-[1px] button-click"
        onClick={() => handleDeleteList()}
      >
        <span className="font-light">{translateText('grocerySettings', 'delete', language)}</span>
        <Trashcan />
      </button>
    </div>
  );
}

export default GroceryListSettings;