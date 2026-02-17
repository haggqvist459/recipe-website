import { RecipeFormErrors, RecipeDraftType } from "../types";

export const validateRecipeDraft = (recipeDraft: RecipeDraftType): RecipeFormErrors => {
  const { title, servings, ingredients, instructions } = recipeDraft;
  const errors: RecipeFormErrors = {};

  if (!title.trim()) errors.title = true;
  if (servings < 1) errors.servings = true;

  const ingredientErrors: Record<string, { name?: boolean; amount?: boolean; unit?: boolean }> = {};
  ingredients.forEach(ingredient => {
    const fieldErrors: { name?: boolean; amount?: boolean; unit?: boolean } = {};
    if (!ingredient.name.trim()) fieldErrors.name = true;
    if (!ingredient.amount.trim()) fieldErrors.amount = true;
    if (!ingredient.unit.trim()) fieldErrors.unit = true;
    if (Object.keys(fieldErrors).length > 0) {
      ingredientErrors[ingredient.id] = fieldErrors;
    }
  });
  if (Object.keys(ingredientErrors).length > 0) errors.ingredients = ingredientErrors;

  const instructionErrors: Record<string, { title?: boolean; text?: boolean }> = {};
  instructions.forEach(instruction => {
    const fieldErrors: { title?: boolean; text?: boolean } = {};
    if (!instruction.title.trim()) fieldErrors.title = true;
    if (!instruction.text.trim()) fieldErrors.text = true;
    if (Object.keys(fieldErrors).length > 0) {
      instructionErrors[instruction.id] = fieldErrors;
    }
  });
  if (Object.keys(instructionErrors).length > 0) errors.instructions = instructionErrors;

  return errors;
};