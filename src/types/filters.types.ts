import { LANGUAGES } from '@/utils/constants';

export type FilterOptionType = {
  id: string
  en_text: string
  sv_text: string
}

export type FilterCategoryType = 'types' | 'cuisines'

export type SortingFilterKey =
  | "newest"
  | "oldest"
  | "a_z"
  | "z_a";


export type LanguageType = (typeof LANGUAGES)[number]['code'];

