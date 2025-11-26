import { PageContainer, Heading } from "@/components";
import { VisibilityFilters, GroceryListItem, AddItem, selectItems } from "@/features/groceryList";
import { useAppSelector } from "@/redux";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

const GroceryPage = () => {

  const { language } = useLanguage()
  const groceryList = useAppSelector(selectItems)
  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter)

  return (
    <PageContainer>
      <VisibilityFilters />
      <div className="mt-5 px-5">
        <Heading title={translateText('groceryPage', 'title', language)} />
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