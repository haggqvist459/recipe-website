import { useState } from "react"
import { useAppSelector } from "@/redux"
import { useLanguage } from "@/contexts"
import { PageContainer, Heading } from "@/components"
import { VisibilityFilters, GroceryListItem, AddItem, GroceryListSettings, selectItems } from "@/features/groceryList"
import { translateText } from "@/utils"


type Props = {}

const PersonalList = (props: Props) => {

  const { language } = useLanguage()
  const groceryList = useAppSelector(selectItems)
  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter)
  const [showListSettings, setShowListSettings] = useState(false)

  return (
    <PageContainer>
      <VisibilityFilters />
      {showListSettings && (
        <div
          className="absolute inset-0 z-40"
          onClick={() => setShowListSettings(false)}
        />
      )}
      <div className="relative">
        <div className="mt-5 px-5 flex justify-between relative">
          <Heading title={translateText('groceryPage', 'title', language)} />
          <GroceryListSettings
            showListSettings={showListSettings}
            setShowListSettings={() => setShowListSettings(prev => !prev)}
          />
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
      </div>
    </PageContainer>
  )
}

export default PersonalList;