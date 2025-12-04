import { useAppSelector, useAppDispatch } from "@/redux";
import { VISIBILITY_FILTERS } from "../constants";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { setVisibilityFilter } from "../slice";
import { HorizontalMenuWrapper } from "@/components";

const VisibilityFilters = () => {

  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter);
  const dispatch = useAppDispatch()
  const { language } = useLanguage()

  return (
    <HorizontalMenuWrapper>
      {Object.values(VISIBILITY_FILTERS).map(filter => (
        <button
          key={filter}
          className={`text-primary-text ${filter === activeFilter ? 'underline' : ''}`}
          onClick={() => dispatch(setVisibilityFilter(filter))}
        >
          {translateText('visibilityFilters', filter, language)}
        </button>
      ))}
    </HorizontalMenuWrapper>
  );
}

export default VisibilityFilters;