import { FavouriteType } from "../types"
import { IconButton } from '@/components/ui'
import { removeFavourite } from '@/integrations/supabase/services'
import { useAppDispatch } from '@/integrations/redux/hooks'
import { deleteFavourite } from '../slice'
import { handleError } from '@/errorHandling'
import { getCategoryColourClasses } from '@/features/filters/helpers/categoryColours'
import { Close } from "@/components/icons"
import { useLanguage, useNotification } from "@/contexts"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared"

type Props = {
  favourite: FavouriteType
}

const FavouriteListItem = ({ favourite }: Props) => {

  const dispatch = useAppDispatch()
  const { bg, border } = getCategoryColourClasses(favourite.mainIngredients[0].categoryCounter)
  const { showToast, setModalState, resetModalState } = useNotification()
  const { language } = useLanguage()



  const showDeleteModal = async () => {
    setModalState({
      isOpen: true,
      title: 'Remove favourite',
      message: 'Are you sure you want to remove this recipe from your favourites?',
      onConfirm: () => handleDelete(),
      onCancel: () => resetModalState()
    })
  }

  const handleDelete = async () => {
    try {
      await removeFavourite(favourite.userId, favourite.recipeId)
      dispatch(deleteFavourite(favourite.recipeId))
    } catch (error) {
      const errorMessage = handleError(error)
      showToast(errorMessage, 'error')
    }
  }


  return (

    <div className={`w-full flex justify-between items-center ${border} border-b-1 border-r-1 rounded-xl bg-marblewhite p-2 my-2`}>
      <div className="flex space-x-2 flex-1 items-center">
        <NavLink
          key={favourite.recipeId}
          to={ROUTES.RECIPES + '/' + favourite.recipeId}
          className={'flex items-center space-x-2'}
        >
          <div className={`h-2 w-2 rounded-full ${bg}`} />
          <div className="flex flex-col space-x-2">
            <div className="w-full flex">
              <span className="font-medium text-primary-text">{`${favourite.title} \u00A0`}</span>
              <span className="font-extralight text-primary-text">
                ({new Date(favourite.createdAt).toLocaleDateString()})
              </span>
            </div>
            <div className="flex space-x-1">
              {favourite.mainIngredients.map(mainIngredient => (
                <span key={mainIngredient.id} className="font-light text-primary-text">{mainIngredient[`${language}_text`]}</span>
              ))}
              {favourite.cuisines.map(cuisine => (
                <span key={cuisine.id} className="font-light text-primary-text">{`• ${cuisine[`${language}_text`]}`}</span>
              ))}
            </div>
          </div>
        </NavLink>
      </div>
      <div className="flex p-1 ml-2 border-1 rounded-full border-secondary-text hover:bg-secondary-text">
        <IconButton onClick={() => showDeleteModal()}>
          <Close colour="text-secondary-text" size="size-4" />
        </IconButton>
      </div>
    </div>
  )
}

export default FavouriteListItem