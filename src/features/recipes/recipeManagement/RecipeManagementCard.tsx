import { RecipeType } from "@/shared/types"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared"
import { EditIcon, TrashOutline } from "@/components/icons"
import { IconButton } from "@/components/ui"
import { getCategoryColourClasses } from "@/features/filters/helpers/categoryColours"
import { useLanguage } from "@/contexts"


type Props = {
  recipe: RecipeType
  onDelete: () => void
}


const RecipeManagementCard = ({ recipe, onDelete }: Props) => {

  const { bg, border } = getCategoryColourClasses(recipe.mainIngredients[0].categoryCounter)
  const { language } = useLanguage()

  return (
    <div className={`flex flex-col bg-ceramic p-2 rounded-lg ${border} border-b-1 border-r-1 `}>
      <div className="px-2.5 flex space-x-5 items-center">
        <div className={`h-2 w-2 flex-none rounded-full ${bg}`}></div>
        <div className="">
          <span className="text-sm font-semibold line-clamp-2">{recipe.title}</span>
          <div className="flex space-x-1">
            {recipe.mainIngredients.map(mainIngredient => (
              <span key={mainIngredient.id} className="font-light text-primary-text">{mainIngredient[`${language}_text`]}</span>
            ))}
            {recipe.cuisines.map(cuisine => (
              <span key={cuisine.id} className="font-light text-primary-text">{`• ${cuisine[`${language}_text`]}`}</span>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 ml-auto">
          <NavLink
            to={ROUTES.ADMIN + '/' + recipe.id}
            state={recipe}
          >
            <EditIcon colour="text-primary" size="size-7"/>
          </NavLink>
          <IconButton onClick={onDelete}>
            <TrashOutline colour="text-secondary-text" size="size-7"/>
          </IconButton>
        </div>
      </div>

    </div>
  )
}

export default RecipeManagementCard