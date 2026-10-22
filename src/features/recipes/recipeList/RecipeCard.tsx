import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Favourite } from "@/components/icons"
import { useIsFavourited } from "@/features/favourites"
import { useLanguage } from "@/contexts"
import { RecipeType } from "@/shared/types"
import { FilterPill } from "@/features/filters"
import { getCategoryColourClasses } from "@/features/filters/helpers/categoryColours"

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {

  const isFavourite = useIsFavourited(recipe.id)
  const { language } = useLanguage()

  // Determine background colour 

  const { bgPale1 } = getCategoryColourClasses(recipe.mainIngredients[0].categoryCounter)

  return (
    <NavLink
      key={recipe.id}
      to={ROUTES.RECIPES + '/' + recipe.id}
      state={{ recipe }}
      className={`flex flex-col ${bgPale1} p-2 px-5 rounded-2xl inset-shadow-xs/15 shadow-sm/15`}
    >
      <div className="flex mt-2 w-full">
        <div className="flex-1 flex gap-2">
          {recipe.mainIngredients.map(ingredient => {
            const { bg } = getCategoryColourClasses(ingredient.categoryCounter ?? 1)
            return <FilterPill key={ingredient.id} text={ingredient[`${language}_text`]} backgroundColour={bg} />
          })}
          {recipe.cuisines.map(cuisine => {
            const { bg } = getCategoryColourClasses(cuisine.categoryCounter ?? 0)
            return <FilterPill key={cuisine.id} text={cuisine[`${language}_text`]} backgroundColour={bg} />
          })}
        </div>
        <Favourite isToggled={isFavourite} />
      </div>
      <span className="label line-clamp-2 mt-2">{recipe.title}</span>
      <span className="line-clamp-3 my-2">{recipe.description}</span>
    </NavLink>
  )
}

export default RecipeCard 