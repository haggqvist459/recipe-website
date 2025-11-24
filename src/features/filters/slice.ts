import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FilterStateType, SortingFilterKey } from "./types";
import { FilterOptionType } from "@/types";


const initialState: FilterStateType = {
  typeFilters: [],
  cuisineFilters: [],
  selectedTypeFilters: [],
  selectedCuisineFilters: [],
  selectedSortingFilter: 'newest'
}


const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilterList: (
      state,
      action: PayloadAction<{
        filterCategory: "types" | "cuisines";
        list: FilterOptionType[];
      }>
    ) => {
      switch (action.payload.filterCategory) {
        case 'types':
          state.typeFilters = action.payload.list;
          break;
        case 'cuisines':
          state.cuisineFilters = action.payload.list;
          break;
        default:
          console.error("filterSlice - setFilterList error: incorrect filterCategory")
          break;
      }
    },
    setActiveFilter: (
      state,
      action: PayloadAction<{ filterCategory: "types" | "cuisines"; filter: FilterOptionType }>
    ) => {
      const { filterCategory, filter } = action.payload;

      switch (filterCategory) {
        case 'types':
          const typeSelected = state.selectedTypeFilters.some(
            selected => selected.id === filter.id
          );

          state.selectedTypeFilters = typeSelected
            ? state.selectedTypeFilters.filter(selected => selected.id !== filter.id)
            : [...state.selectedTypeFilters, filter];
          break;
        case 'cuisines':
          const cuisineSelected = state.selectedCuisineFilters.some(
            selected => selected.id === filter.id
          )

          state.selectedCuisineFilters = cuisineSelected
            ? state.selectedCuisineFilters.filter(selected => selected.id !== filter.id)
            : [...state.selectedCuisineFilters, filter]
          break;
        default:
          console.error("filterSlice - setActiveFiler error: incorrect filter category in payload")
          break;
      }
    },
    setActiveSorting: (
      state,
      action: PayloadAction<SortingFilterKey>
    ) => {
      state.selectedSortingFilter =
        state.selectedSortingFilter === action.payload ? "newest" : action.payload;
    },
    resetState: () => initialState
  }
})

export const { setFilterList, setActiveFilter, setActiveSorting, resetState } = filterSlice.actions
export default filterSlice.reducer