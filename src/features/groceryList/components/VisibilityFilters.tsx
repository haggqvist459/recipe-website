import { useAppSelector, useAppDispatch } from "@/redux";
import { VISIBILITY_FILTERS } from "../constants";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { setVisibilityFilter } from "../slice";

const VisibilityFilters = () => {

  const activeFilter = useAppSelector(state => state.groceryList.visibilityFilter);
  const dispatch = useAppDispatch()
  const { language } = useLanguage()

  return (
    <div className="h-9 bg-primary flex items-center justify-center space-x-5 font-medium">
      {Object.values(VISIBILITY_FILTERS).map(filter => (
        <button
          key={filter}
          className={`text-primary-text ${filter === activeFilter ? 'underline' : ''}`}
          onClick={() => dispatch(setVisibilityFilter(filter))}
        >
          {translateText('visibilityFilters', filter, language)}
        </button>
      ))}
    </div>
  );
}

export default VisibilityFilters;