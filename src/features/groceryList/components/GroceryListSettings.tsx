import { useLanguage, useAuth, useNotification } from "@/contexts";
import { useAppSelector, useAppDispatch } from "@/redux";
import { translateText } from "@/utils";
import { fetchGroceryList, saveGroceryList, deleteGroceryList } from "@/supabase/services";
import { loadListFromDB, resetState, } from "@/features/groceryList";
import { CloudArrowDown, CloudArrowUp, Trashcan, SettingsCircle, FadeInOutWrapper } from "@/components";


type Props = {
  showListSettings: boolean,
  setShowListSettings: () => void
}

const GroceryListSettings = ({ setShowListSettings, showListSettings }: Props) => {
  const { language } = useLanguage()
  const { user } = useAuth()
  const { showToast } = useNotification()
  const dispatch = useAppDispatch()
  const groceryState = useAppSelector(state => state.groceryList)

  const handleSaveList = async () => {
    try {
      if (user) {
        await saveGroceryList(user.id, groceryState.items)
        showToast(translateText('grocerySettings', 'saveToastSuccess', language), 'success')
      }
    } catch (error) {
      showToast(translateText('grocerySettings', 'saveToastError', language), 'error')
      throw error // implement proper error handling with error component
    }
  }

  const handleLoadList = async () => {
    try {
      if (user) {
        const dbList = await fetchGroceryList(user.id)
        console.log("handleLoadList dbList: ", dbList)
        console.log("handleLoadList dbList.updatedAt: ", dbList?.updatedAt)
        console.log('handleLoadList groceryState.lastModified', groceryState.lastModified)
        if (!dbList) {
          showToast(translateText('grocerySettings', 'loadToastNoList', language), 'info')
        } 
        else if (dbList.updatedAt > groceryState.lastModified) {
          console.log('handleLoadList dbList.updateAt true ')
          dispatch(loadListFromDB(dbList.listItems))
          showToast(translateText('grocerySettings', 'loadToastSuccess', language), 'success')
        }
      }
    } catch (error) {
      showToast(translateText('grocerySettings', 'loadToastError', language), 'error')
      throw error
    }
  }

  const handleDeleteList = async () => {
    try {
      if (user) {
        await deleteGroceryList(user.id)
        dispatch(resetState())
        showToast(translateText('grocerySettings', 'deleteToastSuccess', language), 'success')
      }
    } catch (error) {
      showToast(translateText('grocerySettings', 'deleteToastError', language), 'error')
      throw error 
    }
  }

  return (

    <div className="relative">
      <button
        className="button-click p-2"
        onClick={() => setShowListSettings()}
      >
        <SettingsCircle />
      </button>
      <FadeInOutWrapper isVisible={showListSettings}>
          <div
            className="absolute top-full right-0 z-50 inset-shadow-md/15 shadow-md/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-36 bg-primary-bg">
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
          </div>
      </FadeInOutWrapper>
    </div>
  );
}

export default GroceryListSettings;