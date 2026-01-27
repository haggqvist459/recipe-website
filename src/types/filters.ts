import { LANGUAGES } from '@/utils/constants';

export type FilterOptionType = {
  id: string
  text: string
}

export type SortingFilterKey =
  | "newest"
  | "oldest"
  | "a_z"
  | "z_a";


export type LanguageType = (typeof LANGUAGES)[number]['code'];

