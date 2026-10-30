import { useAppSelector, useAppDispatch } from "@/integrations/redux"
import { VISIBILITY_FILTERS } from "../constants"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { setVisibilityFilter } from "../slice"
import { HorizontalMenuWrapper } from "@/components/layout"
import { HorizontalMenuButton } from "@/components/ui"

const VisibilityFilters = () => {

  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter)
  const dispatch = useAppDispatch()
  const { language } = useLanguage()

  return (
    <HorizontalMenuWrapper>
      {Object.values(VISIBILITY_FILTERS).map(filter => (
        <HorizontalMenuButton key={filter} onClick={() => dispatch(setVisibilityFilter(filter))} isActive={filter === activeFilter}>
          {translateText('visibilityFilters', filter, language)}
        </HorizontalMenuButton>
      ))}
    </HorizontalMenuWrapper>
  )
}

export default VisibilityFilters