import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Favourite } from "@/components"
import { useIsFavourited } from "@/features/favourites"
import { useLanguage } from "@/contexts"
import { FilterOptionType, RecipeType } from "@/types"
import { FilterPill } from "@/features/filters"

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {

  const isFavourite = useIsFavourited(recipe.id)
  const { language } = useLanguage()
  const [mergedFilters, setMergedFilters] = useState<FilterOptionType[]>([])
  // Determine background colour 

  // Determine if there are any filters to display, regardless of whether they are a cuisine or main ingredient filter 
  // Map that for the pill button 
  const mapFilters = () => {
    if (recipe.cuisines) {
      setMergedFilters([...recipe.cuisines])
    }
    if (recipe.types) {
      setMergedFilters([...recipe.types])
    }
  }
  useEffect(() => {
    mapFilters()
  }, [])


  return (
    <NavLink
      key={recipe.id}
      to={ROUTES.RECIPES + '/' + recipe.id}
      state={{ recipe }}
      className="flex flex-col bg-white p-2 px-5 rounded-2xl inset-shadow-xs/15 shadow-sm/15"
    >
      <div className="flex mt-2 w-full">
        <div className="flex-1 flex gap-2">
          {mergedFilters.map((filter) => (
            <FilterPill key={filter.id} text={filter[`${language}_text`]} backgroundColour={'bg-primary'}/>
          ))}
        </div>
        <Favourite isToggled={isFavourite} />
      </div>
      <span className="label line-clamp-2 mt-2">{recipe.title}</span>
      <span className="line-clamp-3 my-2">{recipe.description}</span>
    </NavLink>
  )
}

export default RecipeCard 