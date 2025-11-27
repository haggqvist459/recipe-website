import { useState } from "react";
import { useAppSelector } from "@/redux";
import { useLanguage } from "@/contexts";
import { PageContainer, Heading, SettingsCircle } from "@/components";
import { VisibilityFilters, GroceryListItem, AddItem, GroceryListSettings, selectItems } from "@/features/groceryList";
import { translateText } from "@/utils";


const GroceryPage = () => {

  const { language } = useLanguage()
  const groceryList = useAppSelector(selectItems)
  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter)
  const [showListSettings, setShowListSettings] = useState(false)

  return (
    <PageContainer>
      <VisibilityFilters />
      <div className="mt-5 px-5 flex justify-between relative">
        <Heading title={translateText('groceryPage', 'title', language)} />
        <div>
          <button
            className="button-click p-2"
            onClick={() => setShowListSettings(prev => !prev)}
          >
            <SettingsCircle />
          </button>
          {showListSettings && (
            <div className="absolute top-full right-5 z-50 shadow-md">
              <GroceryListSettings />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col px-5 h-[85dvh]">
        <div className="flex-1 overflow-auto min-h-0">
          {groceryList.length === 0 ?
            <div className="mt-5 flex justify-center">
              <span>{translateText('groceryPage', 'emptyList', language)}</span>
            </div>
            :
            <>
              {groceryList.map(item => <GroceryListItem key={item.id} item={item} activeFilter={activeFilter} />)}
            </>}
        </div>
        <div className="w-full flex-shrink-0 mb-10">
          <AddItem />
        </div>
      </div>
    </PageContainer>
  )
}

export default GroceryPage; 