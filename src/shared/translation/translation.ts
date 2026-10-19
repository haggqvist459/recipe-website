import { ERROR_TEXT } from "./errors"
import { COMPONENTS_TEXT } from "./components"
import { LAYOUT_TEXT } from "./layout"

export const translateText = <
  Lang extends keyof typeof ALL_TEXT,
  Category extends keyof typeof ALL_TEXT[Lang],
  Label extends keyof typeof ALL_TEXT[Lang][Category]
>(
  category: Category,
  label: Label,
  lang: Lang
) => ALL_TEXT[lang][category][label]


export const ALL_TEXT = {
  en: { ...ERROR_TEXT.en, ...LAYOUT_TEXT.en, ...COMPONENTS_TEXT.en },
  sv: { ...ERROR_TEXT.sv, ...LAYOUT_TEXT.sv, ...COMPONENTS_TEXT.sv }
} as const
