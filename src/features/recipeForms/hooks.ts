import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetState } from "@/features/recipeForms";
import { createRecipe } from "@/utils/backend/api";
import { useAuthenticatedUser, useNotification } from "@/contexts";

export const useRecipeFormHandlers = () => {

  const user = useAuthenticatedUser();
  const { setModalState, resetModalState } = useNotification();
  const recipeDraft = useAppSelector(state => state.recipeForms.recipeDraft);
  const dispatch = useAppDispatch();

  const handleNavigation = (action: () => void) => {
    const formElement = document.getElementById("recipe-form") as HTMLFormElement | null;
    if (formElement && !formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    action();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await createRecipe(recipeDraft, user.id);
      if (result) {
        setModalState({
          isOpen: true,
          title: "Recipe Created",
          message: "Your recipe was successfully saved!",
          onConfirm: () => {
            dispatch(resetState());
            resetModalState()
          },
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the recipe.";

      setModalState({
        isOpen: true,
        title: "Error Creating Recipe",
        message,
        onConfirm: () => resetModalState(),
      });
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = 1
      if (result) {
        setModalState({
          isOpen: true,
          title: 'Recipe Updated',
          message: 'Your recipe has been successfully updated',
          onConfirm: () => {
            dispatch(resetState())
            resetModalState()
          }
        })
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the recipe.";

      setModalState({
        isOpen: true,
        title: "Error Updating Recipe",
        message,
        onConfirm: () => resetModalState(),
      })
    }
  }

  return { handleNavigation, handleSubmit, handleUpdate };
};