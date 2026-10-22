import { RecipeType } from "@/shared/types"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Trashcan, EditIcon } from "@/components/icons"
import { IconButton } from "@/components/ui"


type Props = {
  recipe: RecipeType
  onDelete: () => void
}


const RecipeManagementCard = ({ recipe, onDelete }: Props) => {
  return (
    <div className="flex flex-col bg-white p-2 rounded-sm inset-shadow-xs/15 shadow-sm/15">
      <div className="flex justify-between">
        <span className="label line-clamp-2">{recipe.title}</span>
        <div className="flex space-x-2">
          <NavLink
            to={ROUTES.ADMIN + '/' + recipe.id}
            state={recipe}
          >
            <EditIcon />
          </NavLink>
          <IconButton onClick={onDelete}>
            <Trashcan />
          </IconButton>
        </div>
      </div>
      <span className="text-sm">
        {new Date(recipe.createdAt).toLocaleDateString()}
      </span>
    </div>
  )
}

export default RecipeManagementCard