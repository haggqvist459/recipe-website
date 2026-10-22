import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/integrations/redux/store";

export const selectMetadata = createSelector(
  (state: RootState) => state.recipeForms.recipeDraft,
  (recipeDraft) => ({
    title: recipeDraft.title,
    description: recipeDraft.description,
    mainIngredients: recipeDraft.mainIngredients,
    cuisines: recipeDraft.cuisines,
    includeWeekly: recipeDraft.includeWeekly,
    servings: recipeDraft.servings
  })
);

export const selectIngredients = (state: RootState) =>
  state.recipeForms.recipeDraft.ingredients;

export const selectInstructions = (state: RootState) =>
  state.recipeForms.recipeDraft.instructions;