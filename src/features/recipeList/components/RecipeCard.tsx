import { RecipeType } from "@/types";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/utils";
import { Favourite } from "@/components";
import { useIsFavourited } from "@/features/favourites";

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {

  const isFavourite = useIsFavourited(recipe.id)

  return (
    <NavLink
      key={recipe.id}
      to={ROUTES.DETAILS_PAGE + recipe.id}
      state={{ recipe }}
      className="flex flex-col bg-white p-2 rounded-sm inset-shadow-xs/15 shadow-sm/15"
    >
      <div className="flex justify-between">
        <span className="label line-clamp-2">{recipe.title}</span>
        <Favourite isToggled={isFavourite}/>
      </div>
      <span className="line-clamp-3 mt-1">{recipe.description}</span>
    </NavLink>
  )
}

export default RecipeCard;