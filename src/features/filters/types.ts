import { SORTING_FILTERS } from "./constants";

export type SortingFilterKey = keyof typeof SORTING_FILTERS;

export type FilterStateType = {
  typeFilters: FilterOptionType[] | []
  selectedTypeFilters: FilterOptionType[] | []
  cuisineFilters: FilterOptionType[] | []
  selectedCuisineFilters: FilterOptionType[] | []
  selectedSortingFilter: SortingFilterKey
}
