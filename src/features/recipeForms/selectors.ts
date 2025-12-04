import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const selectMetadata = createSelector(
  (state: RootState) => state.createRecipe.recipeDraft,
  (recipeDraft) => ({
    title: recipeDraft.title,
    description: recipeDraft.description,
    types: recipeDraft.types,
    cuisines: recipeDraft.cuisines,
    includeWeekly: recipeDraft.includeWeekly,
  })
);

export const selectIngredients = (state: RootState) =>
  state.createRecipe.recipeDraft.ingredients;

export const selectInstructions = (state: RootState) =>
  state.createRecipe.recipeDraft.instructions;