import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { deleteRecipeService, fetchAllRecipes, } from '@/supabase/services';
import { LoadingComponent, ErrorComponent } from "@/components";
import { useLanguage, useNotification, } from '@/contexts';
import RecipeManagementCard from './RecipeManagementCard';
import { setRecipes, removeRecipe } from '../slice';

const RecipeManagementList = () => {

  const { language } = useLanguage()
  const { setModalState, resetModalState } = useNotification()
  const dispatch = useAppDispatch()

  const recipeList = useAppSelector(state => state.recipeList.recipes)
  const needsRefresh = useAppSelector(state => state.recipeList.needsRefresh)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')



  useEffect(() => {
    if (!needsRefresh && recipeList.length > 0) return;

    setLoading(true);
    setError(false)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes(language)
        dispatch(setRecipes(fetchedRecipes))

      } catch (error) {
        if (typeof error === 'string') {
          setErrorMessage(error)
        } else { 
          setErrorMessage('An unknown error occurred when loading recipes')
        }
        setError(true)
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [needsRefresh, language]);

  const handleDelete = (recipeId: string, recipeTitle: string) => {
    setModalState({
      isOpen: true,
      showCancel: true,
      title: 'Delete Recipe',
      message: `Are you sure you want to delete ${recipeTitle}?`,
      onConfirm: async () => {
        try {
          await deleteRecipeService(recipeId)
          dispatch(removeRecipe(recipeId))
          resetModalState()
        } catch (error) {
          if (typeof error === 'string') {
            setErrorMessage(error)
          } else {
            setErrorMessage("An unknown error occured when deleting a recipe")
          }
          setError(true)
          resetModalState()
        }
      },
      onCancel: () => resetModalState()
    })
  }

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <div className='px-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-5 mb-10'>
      {recipeList.map(recipe => (
        <RecipeManagementCard
          key={recipe.id} 
          recipe={recipe} 
          onDelete={() => handleDelete(recipe.id, recipe.title)}
          />
      ))}
    </div>
  );
}

export default RecipeManagementList;