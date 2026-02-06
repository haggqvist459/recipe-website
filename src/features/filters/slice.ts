import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FilterStateType, SortingFilterKey } from "./types";
import { FilterOptionType, FilterCategoryType } from "@/types";


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
        filterCategory: FilterCategoryType;
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
      action: PayloadAction<{ filterCategory: FilterCategoryType, filter: FilterOptionType }>
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
    addFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType; filter: FilterOptionType }>
    ) => {
      const { filterCategory, filter } = action.payload;

      switch (filterCategory) {
        case 'types':
          state.typeFilters.push(filter);
          break;
        case 'cuisines':
          state.cuisineFilters.push(filter);
          break;
        default:
          console.error("filterSlice - addFilter error: incorrect filterCategory");
          break;
      }
    },
    deleteFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType; filterId: string }>
    ) => {
      const { filterCategory, filterId } = action.payload;

      switch (filterCategory) {
        case 'types':
          state.typeFilters = state.typeFilters.filter(f => f.id !== filterId);
          break;
        case 'cuisines':
          state.cuisineFilters = state.cuisineFilters.filter(f => f.id !== filterId);
          break;
        default:
          console.error("filterSlice - deleteFilter error: incorrect filterCategory");
          break;
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType; filterId: string; updatedText: string }>
    ) => {
      const { filterCategory, filterId, updatedText } = action.payload;

      switch (filterCategory) {
        case 'types':
          const typeFilter = state.typeFilters.find(f => f.id === filterId);
          if (typeFilter) {
            typeFilter.text = updatedText;
          }
          break;
        case 'cuisines':
          const cuisineFilter = state.cuisineFilters.find(f => f.id === filterId);
          if (cuisineFilter) {
            cuisineFilter.text = updatedText;
          }
          break;
        default:
          console.error("filterSlice - updateFilter error: incorrect filterCategory");
          break;
      }
    },
    resetState: () => initialState
  }
})

export const { setFilterList, setActiveFilter, setActiveSorting, addFilter, deleteFilter, updateFilter, resetState } = filterSlice.actions
export default filterSlice.reducer