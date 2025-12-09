import { RecipeType } from "@/types";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/utils";
import { Trashcan, EditIcon } from "@/components";

type Props = {
  recipe: RecipeType
}

const RecipeManagementCard = ({ recipe }: Props) => {
  return (
    <div className="flex flex-col bg-white p-2 rounded-sm inset-shadow-xs/15 shadow-sm/15">
      <div className="flex justify-between">
        <span className="label line-clamp-2">{recipe.title}</span>
        <div className="flex space-x-2">
          <NavLink
            to={ROUTES.ADMIN + '/' + recipe.id}
            state={recipe.id}
          >
            <EditIcon />
          </NavLink>
          <Trashcan />
        </div>
      </div>
      <span className="text-sm">
        {recipe.createdAt.toLocaleDateString()}
      </span>
    </div>
  );
}

export default RecipeManagementCard;