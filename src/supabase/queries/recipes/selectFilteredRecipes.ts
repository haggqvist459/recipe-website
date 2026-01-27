import { supabase } from '@/supabase/client';
import { DB_TABLES, DB_COLUMNS } from '@/utils/constants';
import { DbRecipeWithRelations, SortingFilterKey, LanguageType } from '@/types';

const sortConfigMap: Record<SortingFilterKey, { column?: string; ascending?: boolean }> = {
  "a_z": { column: DB_COLUMNS.RECIPES.TITLE, ascending: true },
  "z_a": { column: DB_COLUMNS.RECIPES.TITLE, ascending: false },
  "newest": { column: DB_COLUMNS.RECIPES.CREATED_AT, ascending: false },
  "oldest": { column: DB_COLUMNS.RECIPES.CREATED_AT, ascending: true },
};


export const selectFilteredRecipes = async ({
  typeIds,
  cuisineIds,
  sortingFilter,
  language
}: {
  typeIds?: string[]
  cuisineIds?: string[]
  sortingFilter: SortingFilterKey
  language: LanguageType
}): Promise<DbRecipeWithRelations[]> => {

  try {
    const selectParts: string[] = ["*"];
    if (typeIds?.length) selectParts.push(`${DB_TABLES.RECIPE_MAIN_INGREDIENTS}!inner(${DB_TABLES.MAIN_INGREDIENTS}(${DB_COLUMNS.MAIN_INGREDIENTS.ID}, text:${language}_text))`);
    if (cuisineIds?.length) selectParts.push(`${DB_TABLES.RECIPE_CUISINES}!inner(${DB_TABLES.CUISINES}(id, text:${language}_text))`);
    const selectClause: string = selectParts.join(", ");

    let query = supabase
      .from(DB_TABLES.RECIPES)
      .select<string, DbRecipeWithRelations>(selectClause);


    if (typeIds?.length) query = query.in(`${DB_TABLES.RECIPE_MAIN_INGREDIENTS}.${DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID}`, typeIds)
    if (cuisineIds?.length) query = query.in(`${DB_TABLES.RECIPE_CUISINES}.${DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID}`, cuisineIds)

    const sortConfig = sortConfigMap[sortingFilter];

    if (sortConfig.column) query = query.order(sortConfig.column, { ascending: sortConfig.ascending });

    const { data } = await query.throwOnError();

    return data;

  } catch (error) {
    throw error
  }

}