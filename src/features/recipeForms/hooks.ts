import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { resetState, setErrors, clearErrors } from "@/features/recipeForms"
import { processRecipe, processRecipeUpdate } from "@/supabase/services"
import { useAuthenticatedUser, useLanguage, useNotification } from "@/contexts"
import { ROUTES } from "@/utils"
import { validateRecipeDraft } from "./utils/formValidation"
import { handleError } from "@/errorHandling"

export const useRecipeFormHandlers = (recipeId?: string) => {

  const navigate = useNavigate()
  const user = useAuthenticatedUser()
  const { language } = useLanguage()
  const { setModalState, resetModalState } = useNotification()
  const recipeDraft = useAppSelector(state => state.recipeForms.recipeDraft)
  const dispatch = useAppDispatch()



  const handleNavigation = (action: () => void) => {
    const errors = validateRecipeDraft(recipeDraft);

    if (Object.keys(errors).length > 0) {
      dispatch(setErrors(errors))
      return
    }

    dispatch(clearErrors())
    action()
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await processRecipe(recipeDraft, user.id)
      if (result) {
        setModalState({
          isOpen: true,
          title: "Recipe Created",
          message: "Your recipe was successfully saved!",
          onConfirm: () => {
            dispatch(resetState());
            resetModalState()
          },
        })
      }
    } catch (error) {
      const errorMessage = handleError(error)
    

      setModalState({
        isOpen: true,
        title: "Error Creating Recipe",
        message: errorMessage,
        onConfirm: () => resetModalState(),
      })
    }
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipeId) {
      setModalState({
        isOpen: true,
        title: 'Error Updating Recipe',
        message: 'Recipe ID is missing.',
        onConfirm: () => resetModalState()
      })
      return
    }

    try {
      await processRecipeUpdate(user.id, recipeId, recipeDraft, language)
      setModalState({
        isOpen: true,
        title: 'Recipe Updated',
        message: 'Your recipe has been successfully updated',
        onConfirm: () => {
          dispatch(resetState())
          resetModalState()
          navigate(ROUTES.ADMIN)
        }
      })
    } catch (error) {
      const errorMessage = handleError(error)

      setModalState({
        isOpen: true,
        title: "Error Updating Recipe",
        message: errorMessage,
        onConfirm: () => resetModalState(),
      })


    }
  }

  return { handleNavigation, handleSubmit, handleUpdate }
}